import { getFrom, getDuration, ComponentProps } from "@asius/components";
import { useRef } from "react";
import Moveable from "react-moveable";
import { isPanel } from "../../../../helpers";
import { Animation } from "./Animation";

export const TimelineComp = ({
  comp,
  selected,
  comps,
  setSelected,
  setComp,
  setComps,
  parentDuration,
  changeParent,
}: {
  comp: ComponentProps;
  selected: string;
  comps: ComponentProps[];
  setSelected: (s: string) => void;
  setComp: (comp: ComponentProps) => void;
  setComps: (comps: ComponentProps[]) => void;
  parentDuration: number;
  changeParent: (parentId: string) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  const from = getFrom(parentDuration, comp.from);
  const duration = getDuration(parentDuration, comp.from, comp.duration);
  const hasChildren = comp.comp === "div" || comp.comp === "mockup";
  return (
    <div className="relative cursor-pointer">
      <div
        className="bg-base-content bg-opacity-20 rounded-sm"
        ref={isSelected ? divRef : undefined}
        style={{
          marginLeft: `${(from / parentDuration) * 100}%`,
          width: `${(duration / parentDuration) * 100}%`,
        }}
      >
        <div
          onClick={() => setSelected(comp.id)}
          className={`relative flex h-[40px] items-center px-2 rounded-sm overflow-hidden ${
            isSelected
              ? "bg-gradient-to-r from-secondary to bg-primary text-primary-content"
              : "bg-base-300"
          }`}
        >
          {comp.animations?.map((a, i) => (
            <Animation
              key={i}
              index={i}
              animation={a}
              parentDuration={duration}
            />
          ))}
          {hasChildren && !isSelected && selected && !isPanel(selected) && (
            <div
              className="tooltip absolute right-3 text-xl tooltip-left"
              data-tip="Add selected element to group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeParent(comp.id);
                }}
              >
                +
              </button>
            </div>
          )}
          {isSelected && (
            <div
              className="tooltip absolute right-3 text-3xl tooltip-left"
              data-tip="Remove from group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeParent("");
                }}
              >
                -
              </button>
            </div>
          )}
          <p className="relative">
            {comp.comp}-{comp.id}
          </p>
        </div>
        {hasChildren && comp.children.length > 0 && (
          <div className="space-y-2 py-2">
            {comp.children.map((child, i) => (
              <TimelineComp
                key={i}
                comp={child}
                selected={selected}
                setSelected={setSelected}
                setComp={setComp}
                changeParent={changeParent}
                comps={comp.children}
                setComps={(children) =>
                  setComps(
                    comps.map((c) =>
                      c.id === child.id ? comp : { ...child, children }
                    )
                  )
                }
                parentDuration={duration}
              />
            ))}
          </div>
        )}
      </div>
      {isSelected && (
        <CompMoveable
          divRef={divRef}
          comps={comps}
          parentDuration={parentDuration}
          comp={comp}
          setComp={setComp}
          setComps={setComps}
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
