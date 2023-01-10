"use client";

import { useRef, useState } from "react";
import { TemplateType } from "@asius/components";
import { useTemplate } from "../../../hooks/useTemplate";
import { Header } from "./Header";
import { PlayerControls } from "./PlayerControls";
import { EditCompPanel } from "./SidePanels/EditCompPanel";
import { TemplateSidePanel } from "./SidePanels/TemplateSidePanel";
import { ExportSidePanel } from "./SidePanels/ExportSidePanel";
import { Player } from "./Player";
import { Timeline } from "./TimeLine";
import { AddSidePanel } from "./SidePanels/AddSidePanel";
import { PlayerRef } from "@remotion/player";
import { AISidePanel } from "./SidePanels/AISidePanel";

export default function EditTemplate({
  template: startTemplate,
}: {
  template: TemplateType;
}) {
  const playerRef = useRef<PlayerRef>(null);
  const {
    template,
    selectedComp,
    setComp,
    setTemplate,
    addComp,
    deleteComp,
    selected,
    saveTime,
    setSelected,
  } = useTemplate(startTemplate);

  const [scale, setScale] = useState(0.2);

  const sidePanelWidth = 380;
  const timelineHeigth = 250;
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden flex flex-col">
      <Header
        saveTime={saveTime}
        setSelected={setSelected}
        selected={selected}
        template={template}
      />
      <div className=" w-full flex h-full">
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
            <Player
              playerRef={playerRef}
              scale={scale}
              setComp={setComp}
              setSelected={setSelected}
              template={template}
              selectedComp={selectedComp}
            />
          </div>
          <PlayerControls
            scale={scale}
            setScale={setScale}
            playerRef={playerRef}
            fps={template.fps}
          />
        </div>
        <div
          className="h-full p-3 pl-0"
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
            <div className="absolute top-0 left-0 overflow-y-auto h-full p-3 w-full">
              {!["template", "export", "add", "ai"].includes(selected) &&
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
              {selected === "ai" && (
                <AISidePanel template={template} setTemplate={setTemplate} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 pt-0 shrink-0">
        <div style={{ height: timelineHeigth }} className="panel">
          <Timeline
            template={template}
            setSelected={setSelected}
            playerRef={playerRef}
            selected={selected}
            setComp={setComp}
            setTemplate={setTemplate}
          />
        </div>
      </div>
    </div>
  );
}
