import {
  TemplateType,
  getFrom,
  getDuration,
  ComponentProps,
} from "@asius/components";
import { useRef } from "react";
import Moveable from "react-moveable";
import { Animation } from "./Animation";

export const TimelineComp = ({
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
          {(comp.comp === "div" || comp.comp === "mockup") && (
            <button className="absolute right-3 text-xl">+</button>
          )}
          <p className="relative">
            {comp.comp}-{comp.id}
          </p>
        </div>
      </div>
      {isSelected && (
        <CompMoveable
          divRef={divRef}
          comps={template.comps}
          parentDuration={parentDuration}
          comp={comp}
          setComp={setComp}
          setComps={(comps) => setTemplate({ ...template, comps })}
        />
      )}
    </div>
  );
};

export const CompMoveable = ({
  divRef,
  comps,
  parentDuration,
  comp,
  setComp,
  setComps,
}: {
  divRef: React.RefObject<HTMLDivElement>;
  comps: ComponentProps[];
  parentDuration: number;
  comp: ComponentProps;
  setComp: (comp: ComponentProps) => void;
  setComps: (comps: ComponentProps[]) => void;
}) => {
  return (
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
        ...comps.map((c) => [c.from, (c.from || 0) + (c.duration || 0)]).flat(),
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

        const oldIndex = comps.findIndex((c) => c.id === comp.id);
        const newIndex = oldIndex + indexChange;
        const newComps = [...comps];
        newComps.splice(oldIndex, 1);
        newComps.splice(newIndex, 0, newComp);
        setComps(newComps);
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
  );
};
