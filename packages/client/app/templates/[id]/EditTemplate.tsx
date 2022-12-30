"use client";

import { useEffect, useState } from "react";
import { useShiftKey } from "../../../hooks/useShiftKey";
import { TemplateType } from "@asius/types";
import { useTemplate } from "../../../hooks/useTemplate";
import { Header } from "./Header";
import { PlayerControls } from "./PlayerControls";
import { EditCompPanel } from "./SidePanels/EditCompPanel";
import { TemplateSidePanel } from "./SidePanels/TemplateSidePanel";
import { ExportSidePanel } from "./SidePanels/ExportSidePanel";
import { Player } from "../../../components/Player";
import { Timeline } from "./TimeLine";
import { AddSidePanel } from "./SidePanels/AddSidePanel";
import { usePlayer } from "../../../hooks/usePlayer";

export default function EditTemplate({
  template: startTemplate,
}: {
  template: TemplateType;
}) {
  const { playerRef, frame, isPlaying } = usePlayer();

  const {
    update,
    template,
    selectedComp,
    setComp,
    setTemplate,
    addComp,
    deleteComp,
    selected,
    setSelected,
  } = useTemplate(startTemplate);

  const [scale, setScale] = useState(0.2);
  const lockAspectRatio = useShiftKey();

  useEffect(() => {
    const interval = setInterval(() => update(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  const sidePanelWidth = 350;
  const timelineHeigth = 250;
  return (
    <div className="bg-base-300  w-screen h-screen overflow-hidden flex flex-col">
      <Header setSelected={setSelected} selected={selected} />
      <div className=" w-full flex h-full">
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
            <Player
              playerRef={playerRef}
              edit={{
                lockAspectRatio,
                scale,
                select: setSelected,
                selected,
                setComp,
              }}
              template={template}
            />
          </div>
          <PlayerControls
            scale={scale}
            setScale={setScale}
            playerRef={playerRef}
            frame={frame}
            isPlaying={isPlaying}
            fps={template.fps}
          />
        </div>
        <div
          className="h-full p-3  pl-0"
          style={{
            paddingRight: selected ? undefined : 0,
            paddingLeft: selected ? undefined : 0,
          }}
        >
          <div
            style={{
              width: selected ? sidePanelWidth : 0,
              paddingRight: selected ? undefined : 0,
              paddingLeft: selected ? undefined : 0,
            }}
            className="h-full duration-200 panel relative"
          >
            <div className="absolute top-0 left-0 overflow-y-scroll h-full p-3 w-full">
              {!["template", "export", "add"].includes(selected) &&
                selectedComp && (
                  <EditCompPanel
                    comp={selectedComp}
                    setComp={setComp}
                    addComp={addComp}
                    deleteComp={deleteComp}
                  />
                )}
              {selected === "template" && (
                <TemplateSidePanel
                  template={template}
                  setTemplate={setTemplate}
                />
              )}
              {selected === "export" && <ExportSidePanel template={template} />}
              {selected === "add" && <AddSidePanel addComp={addComp} />}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 pt-0 shrink-0">
        <div style={{ height: timelineHeigth }} className="panel">
          <Timeline
            frame={frame}
            template={template}
            setSelected={setSelected}
            setComp={setComp}
            playerRef={playerRef}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}
