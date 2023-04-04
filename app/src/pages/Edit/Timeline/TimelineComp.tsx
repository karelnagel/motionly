import { Comp, components } from "../../../composition";
import { useRef } from "react";
import Moveable from "react-moveable";
import { capitalize } from "../../../helpers";
import { useComponent, useTemplateStore, useTemplate } from "../../../store";

const selector = (c: Comp) => ({
  title: "text" in c.props ? c.props.text : capitalize(c.type),
  hue: components[c.type].hue,
  Icon: components[c.type].Icon,
  from: c.from,
  duration: c.duration,
});

export const TimelineComponent = ({ id }: { id: string }) => {
  const isSelected = useTemplateStore((t) => t.component === id);
  const { title, Icon, duration, from, hue } = useComponent(selector, id)!;
  const templatedDuration = useTemplate((t) => t.duration || 1);
  const setSelected = useTemplateStore((t) => t.setComponent);
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div className="cursor-pointer">
      <div
        className=" rounded-lg"
        ref={isSelected ? divRef : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(id);
        }}
        style={{
          background: `hsl(${hue}, 35%, 50%, 30%)`,
          marginLeft: `${((from || 0) / templatedDuration) * 100}%`,
          width: `${((duration || 1) / templatedDuration) * 100}%`,
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
            <p className="">{title}</p>
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
