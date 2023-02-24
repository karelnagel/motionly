import { getFrom, getDuration, ComponentProps } from "@motionly/base";
import { useRef, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import Moveable from "react-moveable";
import { isPanel } from "../../../../../helpers";
import { ShowHide } from "../../../../../components/ShowHide";
import { useProject } from "../../../../../hooks/useProject";
import { useComponent } from "../../../../../hooks/useComponent";
import { components } from "../Right/Tabs/components";

export const TimelineComp = ({
  id,
  parentDuration,
}: {
  id: string;
  parentDuration: number;
}) => {
  const selected = useProject((t) => t.selected);
  const comp = useComponent(id);
  const parent = useComponent(comp?.parentId);
  if (!comp) return null;
  const setSelected = useProject((t) => t.setSelected);
  const changeParent = useProject((t) => t.changeParent);

  const [show, setShow] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  const from = getFrom(parentDuration, comp.from);
  const duration = getDuration(parentDuration, comp.from, comp.duration);
  const hasChildren = "childIds" in comp;
  const componentProps = components[comp.comp];
  return (
    <div className="cursor-pointer">
      <div
        className=" rounded-lg"
        ref={isSelected ? divRef : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(comp.id);
        }}
        style={{
          background: `hsl(${componentProps.hue}, 35%, 50%, 30%)`,
          marginLeft: `${(from / parentDuration) * 100}%`,
          width: `${(duration / parentDuration) * 100}%`,
        }}
      >
        <div
          style={{
            background: `hsl(${componentProps.hue}, 35%, 40%)`,
            color: "#FFF",
          }}
          className={`relative rounded-lg flex h-[30px] items-center px-2 overflow-hidden justify-between `}
        >
          {/* <div className="absolute top-0 left-0 h-full w-full flex flex-col space-y-[2px] py-[2px] overflow-hidden">
            {comp.animations?.allIds.map((id, i) => (
              <Animation
                key={i}
                animation={comp.animations?.byIds[id]}
                parentDuration={duration}
              />
            ))}
          </div> */}

          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full flex items-center">
            <componentProps.Icon className="inline-block mr-2 shrink-0" />
            <p className="">
              {"text" in comp ? comp.text : componentProps.name}
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
            {isSelected && comp.parentId && (
              <div
                className="tooltip tooltip-left"
                data-tip="Remove from group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeParent(parent?.parentId);
                  }}
                >
                  <IoIosRemove />
                </button>
              </div>
            )}
            {hasChildren && comp.childIds.length > 0 && (
              <div
                className="tooltip tooltip-left text-lg"
                data-tip={show ? "Minimize" : "Maximize"}
              >
                <ShowHide setShow={setShow} show={show} />
              </div>
            )}
          </div>
        </div>
        {hasChildren && comp.childIds.length > 0 && show && (
          <div className="space-y-2 py-2">
            {comp.childIds.map((id, i) => (
              <TimelineComp key={i} id={id} parentDuration={duration} />
            ))}
          </div>
        )}
      </div>

      {isSelected && (
        <CompMoveable
          divRef={divRef}
          parentDuration={parentDuration}
          comp={comp}
        />
      )}
    </div>
  );
};

export const CompMoveable = ({
  divRef,
  parentDuration,
  comp,
}: {
  divRef: React.RefObject<HTMLDivElement>;
  parentDuration: number;
  comp: ComponentProps;
}) => {
  const comps = useProject((t) => t.project.template.components);
  const setComp = useProject((t) => t.setComp);
  const set = useProject((t) => t.set);
  const setComps = useProject((t) => t.setComps);
  const parentWidth = () => divRef.current?.parentElement?.offsetWidth || 1;
  const verticalGuidelines = Object.values(comps)
    .filter((c) => c.id !== comp.id)
    .map((c) => [c.from, (c.from || 0) + (c.duration || parentDuration)])
    .flat()
    .map((x) => ((x || 0) / parentDuration) * parentWidth());
  return (
    <Moveable
      target={divRef}
      bounds={{
        left: 0,
        right: parentWidth(),
      }}
      resizable={true}
      draggable={true}
      snappable={true}
      snapCenter={true}
      snapThreshold={3}
      renderDirections={["w", "e"]}
      elementSnapDirections={{
        left: true,
        top: true,
        right: true,
        bottom: true,
      }}
      verticalGuidelines={verticalGuidelines}
      onDrag={({ delta, beforeDist }) => {
        const from =
          (comp.from || 0) + (delta[0] / parentWidth()) * parentDuration;
        set((s) => {
          const comp = s.project.template.components[s.selected];
          if (from > 0) comp.from = from;
          const indexChange = Math.round(beforeDist[1] / 34);
          if (!indexChange) return;
          const parentId = comp.parentId;
          const parent = parentId
            ? s.project.template.components[parentId]
            : s.project.template;
          if (parent && "childIds" in parent) {
            const oldIndex = parent.childIds.indexOf(comp.id);
            parent.childIds.splice(oldIndex, 1);
            parent.childIds.splice(oldIndex + indexChange, 0, comp.id);
          }
        });
      }}
      onResize={({ width, delta, target, direction }) => {
        const duration: number = (width / parentWidth()) * parentDuration;
        console.log(parentWidth(), parentDuration, width, duration);
        if (duration < 0) return;
        setComp((c) => {
          if (direction[0] === -1) {
            c.from = (c.from || 0) + (c.duration || parentDuration) - duration;
          }
          c.duration = duration;
        });
        delta[0] && (target.style.width = `${width}px`);
      }}
    />
  );
};
