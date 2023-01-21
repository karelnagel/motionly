import { getFrom, getDuration, ComponentProps } from "@asius/base";
import { useRef, useState } from "react";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosRemove,
} from "react-icons/io";
import Moveable from "react-moveable";
import { useTemplate } from "../../../../hooks/useTemplate";
import { isPanel } from "../../../../helpers";
import { Animation } from "./Animation";

export const TimelineComp = ({
  comp,
  comps,
  parentDuration,
  parentId,
}: {
  comp: ComponentProps;
  comps: ComponentProps[];
  parentDuration: number;
  parentId: string;
}) => {
  const { selected, setSelected, changeParent } = useTemplate();
  const [minimize, setMinimize] = useState(false);
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
        onClick={(e) => {
          e.stopPropagation();
          setSelected(comp.id);
        }}
        style={{
          marginLeft: `${(from / parentDuration) * 100}%`,
          width: `${(duration / parentDuration) * 100}%`,
        }}
      >
        <div
          onClick={() => setSelected(comp.id)}
          className={`relative flex h-[40px] items-center px-2 rounded-sm overflow-hidden justify-between ${
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
          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
            <p className="sticky left-0 right-0">
              {comp.comp}-{comp.id}
            </p>
          </div>

          <div className="text-xl flex space-x-2 leading-none items-center h-full top-0">
            {hasChildren && !isSelected && selected && !isPanel(selected) && (
              <div
                className="tooltip tooltip-left"
                data-tip="Add selected element to group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeParent(comp.id);
                  }}
                >
                  <IoIosAdd />
                </button>
              </div>
            )}
            {isSelected && parentId && (
              <div
                className="tooltip tooltip-left"
                data-tip="Remove from group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeParent("");
                  }}
                >
                  <IoIosRemove />
                </button>
              </div>
            )}
            {hasChildren && comp.children.length > 0 && (
              <div
                className="tooltip tooltip-left text-lg"
                data-tip={!minimize ? "Minimize" : "Maximize"}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinimize((m) => !m);
                  }}
                >
                  {!minimize ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </button>
              </div>
            )}
          </div>
        </div>
        {hasChildren && comp.children.length > 0 && !minimize && (
          <div className="space-y-2 py-2">
            {comp.children.map((child, i) => (
              <TimelineComp
                key={i}
                parentId={comp.id}
                comp={child}
                comps={comp.children}
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
          parentId={parentId}
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
  parentId,
}: {
  divRef: React.RefObject<HTMLDivElement>;
  comps: ComponentProps[];
  parentDuration: number;
  comp: ComponentProps;
  parentId: string;
}) => {
  const { setComp, setComps } = useTemplate();
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
        setComps(newComps, parentId);
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
