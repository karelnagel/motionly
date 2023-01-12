import {
  AnimationProps,
  ComponentProps,
  getDuration,
  getFrom,
  TemplateType,
} from "@asius/components";
import { PlayerRef } from "@remotion/player";
import { RefObject, useRef } from "react";
import Moveable from "react-moveable";
import { getAnimationColor } from "../../../helpers";
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
      <div className="overflow-y-auto h-full flex flex-col px-3 ">
        {template.comps.map((comp, i) => (
          <TimelineComp
            key={i}
            comp={comp}
            selected={selected}
            onClick={() => setSelected(comp.id)}
            setComp={setComp}
            template={template}
            setTemplate={setTemplate}
            parentDuration={template.duration}
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
  parentDuration,
}: {
  comp: ComponentProps;
  selected: string;
  template: TemplateType;
  onClick: () => void;
  setComp: (comp: ComponentProps) => void;
  setTemplate: (template: TemplateType) => void;
  parentDuration: number;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  const from = getFrom(parentDuration, comp.from);
  const duration = getDuration(parentDuration, comp.from, comp.duration);
  return (
    <div key={comp.id} className="py-1 relative" onClick={onClick}>
      <div className="p-[8px] w-full relative h-[40px] cursor-pointer ">
        <div
          ref={isSelected ? divRef : undefined}
          className={`absolute top-0 h-full rounded-sm overflow-hidden flex items-center px-2 ${
            isSelected
              ? "bg-gradient-to-r from-secondary to bg-primary text-primary-content"
              : "bg-base-300"
          }`}
          style={{
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
            left: `${(from / parentDuration) * 100}%`,
            width: `${(duration / parentDuration) * 100}%`,
          }}
        >
          {comp.animations?.map((a, i) => (
            <Animation
              key={i}
              index={i}
              animation={a}
              parentDuration={duration}
            />
          ))}
          <p className="relative">
            {comp.comp}-{comp.id}
          </p>
        </div>
      </div>
      {isSelected && (
        <Moveable
          target={divRef}
          bounds={{
            left: 0,
            right: divRef.current?.parentElement?.offsetWidth,
          }}
          resizable={true}
          draggable={true}
          snappable={true}
          snapCenter={true}
          snapThreshold={10}
          renderDirections={["w", "e"]}
          className="timeline-moveable"
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
              .map((c) => [c.from, (c.from || 0) + (c.duration || 0)])
              .flat(),
            0,
            parentDuration / 2,
            parentDuration,
          ].map(
            (x) =>
              ((x || 0) / parentDuration) *
              (divRef.current?.parentElement?.offsetWidth || 1)
          )}
          onDrag={({ delta, beforeDist }) => {
            const newComp = {
              ...comp,
              from:
                (comp.from || 0) +
                (delta[0] / (divRef.current?.parentElement?.offsetWidth || 1)) *
                  parentDuration,
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
              parentDuration;
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
export const Animation = ({
  animation,
  index,
  parentDuration,
}: {
  animation: AnimationProps;
  index: number;
  parentDuration: number;
}) => {
  const from = getFrom(parentDuration, animation.start);
  const duration = getDuration(
    parentDuration,
    animation.start,
    animation.duration
  );
  return (
    <div
      className="absolute h-[3px] w-full left-0 rounded-full"
      style={{
        top: index * 6 + 3,
        left: `${(from / parentDuration) * 100}%`,
        width: `${(duration / parentDuration) * 100}%`,
        background: getAnimationColor(animation),
      }}
    />
  );
};
