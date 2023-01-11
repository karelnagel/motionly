"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export const Resize = ({
  value,
  setValue,
  isHorizontal = false,
}: {
  value: number;
  setValue: (w: number) => void;
  isHorizontal?: boolean;
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) {
        return;
      }
      setValue(value - (isHorizontal ? e.movementY : e.movementX));
    },
    [isResizing, value]
  );

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [isResizing, onMouseMove, onMouseUp]);

  return (
    <div
      onMouseDown={onMouseDown}
      className={` ${
        isHorizontal
          ? "w-full h-1 cursor-ns-resize"
          : " h-full w-1 cursor-ew-resize"
      } hover:bg-primary absolute left-0 top-0 select-none `}
    />
  );
};

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

  const [scale, setScale] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  const [sidePanelWidth, setSidePanelWidth] = useState(380);
  const [timelineHeigth, setTimelineHeight] = useState(250);

  useEffect(() => {
    if (ref.current?.clientHeight && ref.current?.clientWidth) {
      const scaleX = ref.current?.clientWidth / template.width;
      const scaleY = ref.current?.clientHeight / template.height;
      console.log(scaleX, scaleY);
      setScale(Math.min(scaleX, scaleY));
    }
  }, [sidePanelWidth, timelineHeigth]);
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden flex flex-col">
      <Header
        saveTime={saveTime}
        setSelected={setSelected}
        selected={selected}
        template={template}
      />
      <div className=" w-full flex h-full">
        <div className="w-full relative h-full overflow-hidden flex flex-col">
          <div
            ref={ref}
            className="flex items-center justify-center h-full w-full relative m-4"
          >
            <Player
              playerRef={playerRef}
              scale={scale || 0.2}
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
            <div className="absolute top-0 left-0 flex h-full p-3 w-full">
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
            <Resize value={sidePanelWidth} setValue={setSidePanelWidth} />
          </div>
        </div>
      </div>
      <div className="p-3 pt-0 shrink-0">
        <div style={{ height: timelineHeigth }} className="panel relative">
          <Timeline
            template={template}
            setSelected={setSelected}
            playerRef={playerRef}
            selected={selected}
            setComp={setComp}
            setTemplate={setTemplate}
          />
          <Resize
            value={timelineHeigth}
            setValue={setTimelineHeight}
            isHorizontal
          />
        </div>
      </div>
    </div>
  );
}
