"use client";

import { useEffect, useRef, useState } from "react";
import { useShiftKey } from "../../../hooks/useShiftKey";
import { TemplateType } from "@asius/types";
import { useTemplate } from "../../../hooks/useTemplate";
import { SidePanelType } from "../../../types";
import { Header } from "./Header";
import { PlayerControls } from "./PlayerControls";
import { CompSidePanel } from "./SidePanels/CompSidePanel";
import { TemplateSidePanel } from "./SidePanels/TemplateSidePanel";
import { ExportSidePanel } from "./SidePanels/ExportSidePanel";
import { Player } from "../../../components/Player";
import { PlayerRef } from "@remotion/player";
import { Timeline } from "./TimeLine";

export default function EditTemplate({ template: startTemplate }: { template: TemplateType }) {
  const [selected, setSelected] = useState("");
  const playerRef = useRef<PlayerRef>(null);
  const { update, template, selectedComp, setComp, setTemplate } = useTemplate(
    startTemplate,
    selected
  );
  const [scale, setScale] = useState(0.2);
  const lockAspectRatio = useShiftKey();
  const [show, setShow] = useState<SidePanelType>("template");

  useEffect(() => {
    const interval = setInterval(() => update(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  useEffect(() => {
    if (selected) setShow("comp");
  }, [selected]);

  const sidePanelWidth = 350;
  const timelineHeigth = 200;

  return (
    <div className="bg-base-300  w-screen h-screen overflow-hidden flex flex-col">
      <Header setShow={setShow} show={show} />
      <div className=" w-full flex h-full">
        <div className="w-full relative h-full overflow-hidden">
          <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
            <Player
              playerRef={playerRef}
              edit={{ lockAspectRatio, scale, select: setSelected, selected, setComp }}
              template={template}
            />
          </div>

          <PlayerControls scale={scale} setScale={setScale} playerRef={playerRef} />
        </div>
        <div className="h-full p-3  pl-0" style={{ padding: show ? undefined : 0 }}>
          <div
            style={{
              width: show ? sidePanelWidth : 0,
              padding: show ? undefined : 0,
            }}
            className="h-full duration-200 panel"
          >
            {show === "comp" && <CompSidePanel />}
            {show === "template" && <TemplateSidePanel />}
            {show === "export" && <ExportSidePanel />}
          </div>
        </div>
      </div>
      <div className="p-3 pt-0">
        <div style={{ height: timelineHeigth }} className="panel">
          <Timeline
            comps={template.comps}
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
