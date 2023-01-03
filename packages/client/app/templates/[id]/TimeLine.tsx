import { ComponentProps, TemplateType } from "@asius/components";
import { PlayerRef } from "@remotion/player";
import { RefObject, useRef } from "react";
import Moveable from "react-moveable";
import { useCurrentPlayerFrame } from "../../../hooks/useCurrentPlayerFrame";

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
                  className={"h-3 bg-black"}
                  style={{ width: i % 2 === 0 ? 2 : 1 }}
                />
                <p className="text-sm">{i % 2 === 0 && Math.floor(i / 2)}</p>
              </div>
            )
          )}
          <input
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
      <div className="overflow-y-scroll h-full flex flex-col px-3 ">
        {template.comps.map((comp, i) => (
          <TimelineComp
            key={i}
            comp={comp}
            selected={selected}
            onClick={() => setSelected(comp.id)}
            setComp={setComp}
            template={template}
            setTemplate={setTemplate}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineComp = ({
  comp,
  selected,
  template,
  onClick,
  setComp,
  setTemplate,
}: {
  comp: ComponentProps;
  selected: string;
  template: TemplateType;
  onClick: () => void;
  setComp: (comp: ComponentProps) => void;
  setTemplate: (template: TemplateType) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  return (
    <div key={comp.id} className="py-1 relative" onClick={onClick}>
      <div className="p-[8px] rounded-lg w-full relative h-[40px] cursor-pointer ">
        <div
          ref={isSelected ? divRef : undefined}
          className={`absolute top-0 h-full rounded-lg flex items-center px-2 ${
            isSelected ? "bg-primary text-primary-content" : "bg-base-200"
          }`}
          style={{
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
            left: `${(comp.from / template.duration) * 100}%`,
            width: `${
              comp.duration
                ? (comp.duration / template.duration) * 100
                : 100 - (comp.from / template.duration) * 100
            }%`,
          }}
        >
          {comp.type}-{comp.id}
        </div>
      </div>
      {isSelected && (
        <Moveable
          target={divRef}
          resizable={true}
          draggable={true}
          snappable={true}
          snapCenter={true}
          snapThreshold={10}
          renderDirections={["w", "e"]}
          snapHorizontal={true}
          snapVertical={true}
          elementSnapDirections={{
            left: true,
            top: true,
            right: true,
            bottom: true,
            center: true,
            middle: true,
          }}
          horizontalGuidelines={[
            ...template.comps
              .filter((c) => c.id !== selected)
              .map((c) => [c.from, c.from + c.duration])
              .flat(),
            0,
            template.duration / 2,
            template.duration,
          ].map(
            (x) =>
              (x / template.duration) *
              (divRef.current?.parentElement?.offsetWidth || 1)
          )}
          onDrag={({ delta, beforeDist }) => {
            const newComp = {
              ...comp,
              from:
                comp.from +
                (delta[0] / (divRef.current?.parentElement?.offsetWidth || 1)) *
                  template.duration,
            };
            const indexChange = Math.round(beforeDist[1] / 48);

            if (!indexChange) return setComp(newComp);

            const oldIndex = template.comps.findIndex((c) => c.id === comp.id);
            const newIndex = oldIndex + indexChange;
            const comps = [...template.comps];
            comps.splice(oldIndex, 1);
            comps.splice(newIndex, 0, newComp);
            setTemplate({
              ...template,
              comps,
            });
          }}
          onResize={({ width, delta, target }) => {
            const duration =
              (width / (divRef.current?.parentElement?.offsetWidth || 1)) *
              template.duration;
            setComp({
              ...comp,
              duration,
            });
            delta[0] && (target.style.width = `${width}px`);
          }}
        />
      )}
    </div>
  );
};
