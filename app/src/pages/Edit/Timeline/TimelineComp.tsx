import { components } from "../../../composition";
import { useRef } from "react";
import Moveable from "react-moveable";
import { capitalize } from "../../../helpers";
import { useComponent, useTemplateStore, useTemplate } from "../../../store";

export const TimelineComponent = ({ id }: { id: string }) => {
  const selected = useTemplateStore((t) => t.component);
  const comp = useComponent(id);
  const template = useTemplate();
  const parentDuration = template.duration || 1;
  const setSelected = useTemplateStore((t) => t.setComponent);
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  if (!comp) return null;
  const hue = components[comp.type].hue;
  const Icon = components[comp.type].Icon;
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
          background: `hsl(${hue}, 35%, 50%, 30%)`,
          marginLeft: `${((comp.from || 0) / parentDuration) * 100}%`,
          width: `${((comp.duration || 1) / parentDuration) * 100}%`,
        }}
      >
        <div
          style={{
            background: `hsl(${hue}, 35%, 40%)`,
            color: "#FFF",
          }}
          className={`relative rounded-lg flex h-[30px] items-center px-2 overflow-hidden justify-between `}
        >
          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full flex items-center">
            <Icon className="inline-block mr-2 shrink-0" />
            <p className="">{"text" in comp.props ? comp.props.text : capitalize(comp.type)}</p>
          </div>
        </div>
      </div>
      {isSelected && <CompMoveable divRef={divRef} />}
    </div>
  );
};

export const CompMoveable = ({ divRef }: { divRef: React.RefObject<HTMLDivElement> }) => {
  const verticalGuidelines: number[] = []; //Todo
  return (
    <Moveable
      target={divRef}
      bounds={{
        left: 0,
        right: 100, //Todo
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
      onDrag={({ delta, beforeDist }) => {}}
      onResize={({ width, delta, target, direction }) => {}}
    />
  );
};
