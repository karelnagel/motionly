"use client";

import { useEffect, useRef, useState } from "react";
import { TemplateType } from "@asius/components";
import { TemplateContext } from "../../../components/TemplateContext";
import { Header } from "./Header";
import { PlayerControls } from "./PlayerControls";
import { EditCompPanel } from "./SidePanels/EditCompPanel";
import { TemplateSidePanel } from "./SidePanels/TemplateSidePanel";
import { ExportSidePanel } from "./SidePanels/ExportSidePanel";
import { Player } from "./Player";
import { Timeline } from "./Timeline";
import { AddSidePanel } from "./SidePanels/AddSidePanel";
import { PlayerRef } from "@remotion/player";
import { AISidePanel } from "./SidePanels/AISidePanel";
import { Resize } from "../../../components/Resize";
import { HotKeys } from "../../../components/HotKeys";
import { isPanel } from "../../../helpers";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useTemplate } from "../../../hooks/useTemplate";

export function ClientPage({
  template: startTemplate,
}: {
  template: TemplateType;
}) {
  return (
    <TemplateContext startTemplate={startTemplate}>
      <EditTemplate />
    </TemplateContext>
  );
}

export function EditTemplate() {
  const playerRef = useRef<PlayerRef>(null);
  const { template, selected } = useTemplate();

  const [scale, setScale] = useState<number>();
  const playerDivRef = useRef<HTMLDivElement>(null);
  const [sideWidth, setSideWidth] = useLocalStorage("sideWidth", 380);
  const [timelineHeigth, setTimelineHeight] = useLocalStorage(
    "timelineHeigth",
    250
  );

  useEffect(() => {
    if (
      playerDivRef.current?.clientHeight &&
      playerDivRef.current?.clientWidth
    ) {
      const scaleX = playerDivRef.current?.clientWidth / template.width;
      const scaleY = playerDivRef.current?.clientHeight / template.height;
      setScale(Math.min(scaleX, scaleY));
    }
  }, [sideWidth, timelineHeigth]);

  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <div className=" w-full flex h-full">
        <div className="w-full relative h-full overflow-hidden flex flex-col">
          <div
            ref={playerDivRef}
            className="flex items-center justify-center h-full w-full relative m-4"
          >
            <Player playerRef={playerRef} scale={scale || 0.2} />
          </div>
          <PlayerControls
            scale={scale}
            setScale={setScale}
            playerRef={playerRef}
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
              width: selected ? sideWidth : 0,
              paddingRight: selected ? undefined : 0,
              paddingLeft: selected ? undefined : 0,
            }}
            className="h-full duration-200 panel relative"
          >
            <div className="absolute top-0 left-0 flex h-full p-3 w-full">
              {!isPanel(selected) && <EditCompPanel />}
              {selected === "template" && <TemplateSidePanel />}
              {selected === "export" && <ExportSidePanel />}
              {selected === "add" && <AddSidePanel />}
              {selected === "ai" && <AISidePanel />}
            </div>
            <Resize value={sideWidth} setValue={setSideWidth} />
          </div>
        </div>
      </div>
      <div className="p-3 pt-0 shrink-0">
        <div style={{ height: timelineHeigth }} className="panel relative">
          <Timeline playerRef={playerRef} />
          <Resize
            value={timelineHeigth}
            setValue={setTimelineHeight}
            isHorizontal
          />
        </div>
      </div>
      <HotKeys playerRef={playerRef} />
    </div>
  );
}
