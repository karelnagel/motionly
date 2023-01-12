import { ComponentProps, TemplateType } from "@asius/components";
import { PlayerRef } from "@remotion/player";
import { RefObject } from "react";
import { useCurrentPlayerFrame } from "../../../../hooks/useCurrentPlayerFrame";
import { TimelineComp } from "./TimelineComp";

export const Timeline = ({
  template,
  setSelected,
  playerRef,
  selected,
  setComp,
  setTemplate,
}: {
  setSelected: (s: string) => void;
  template: TemplateType;
  playerRef: RefObject<PlayerRef>;
  selected: string;
  setComp: (comp: ComponentProps) => void;
  setTemplate: (template: TemplateType) => void;
}) => {
  const frame = useCurrentPlayerFrame(playerRef);

  return (
    <div className="h-full w-full flex flex-col ">
      <div className="h-14 w-full relative p-3">
        <div className=" relative ">
          {new Array(template.duration * 2 + 1).fill(0).map((_, i) =>
            i % Math.ceil(template.duration / 10) !== 0 ? null : (
              <div
                key={i}
                className="absolute top-0 flex flex-col -translate-x-1/2 items-center"
                style={{
                  left: `${(i / 2 / template.duration) * 100}%`,
                }}
              >
                <div
                  className={"h-3 bg-base-content"}
                  style={{ width: i % 2 === 0 ? 2 : 1 }}
                />
                <p className="text-sm">{i % 2 === 0 && Math.floor(i / 2)}</p>
              </div>
            )
          )}
          <input
            id="timeline"
            type="range"
            value={frame}
            onChange={(e) => {
              playerRef.current?.seekTo(Number(e.currentTarget.value));
            }}
            step={1}
            min={0}
            max={template.duration * template.fps}
            className="absolute top-0 left-0 w-full h-6 timeline"
          />
        </div>
      </div>
      <div className="overflow-y-auto px-3 pb-2">
        <div className="flex flex-col space-y-2">
          {template.comps.map((comp, i) => (
            <TimelineComp
              key={i}
              comp={comp}
              selected={selected}
              setSelected={setSelected}
              setComp={setComp}
              comps={template.comps}
              setComps={(comps) => setTemplate({ ...template, comps })}
              parentDuration={template.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
