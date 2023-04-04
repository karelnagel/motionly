import { Comp, components } from "../../../composition";
import { useEffect, useRef, useState } from "react";
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

const useTimelineWidth = () => {
  const duration = useTemplate((t) => t.duration || 1);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = document.getElementById("timeline");
    if (!el) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);
  return { width, scale: width / duration, duration };
};

export const TimelineComponent = ({ id }: { id: string }) => {
  const isSelected = useTemplateStore((t) => t.component === id);
  const { title, Icon, duration, from, hue } = useComponent(selector, id)!;
  const setSelected = useTemplateStore((t) => t.setComponent);
  const { scale, duration: tempDur } = useTimelineWidth();
  return (
    <div className="cursor-pointer">
      <div
        id={`timeline-${id}`}
        className="rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          setSelected(id);
        }}
        style={{
          background: `hsl(${hue}, 35%, 50%, 30%)`,
          marginLeft: `${Math.min(100, (from / tempDur) * 100)}%`,
          width: `${Math.min(100, (duration / tempDur) * 100)}%`,
        }}
      >
        <div
          style={{
            background: `hsl(${hue}, 35%, 40%)`,
            color: "#FFF",
          }}
          className="relative rounded-lg flex h-[30px] items-center px-2 overflow-hidden justify-between "
        >
          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full flex items-center">
            <Icon className="inline-block mr-2 shrink-0" />
            <p>{title}</p>
          </div>
        </div>
      </div>
      {isSelected && <CompMoveable id={id} />}
    </div>
  );
};
const useGuidelines = (id: string) => {
  const { scale } = useTimelineWidth();
  return useTemplate((t) =>
    Object.values(t.components)
      .filter((c) => c.id !== id)
      .map((c) => c.from * scale)
  );
};
export const CompMoveable = ({ id }: { id: string }) => {
  const editComponent = useTemplateStore((t) => t.editComponent);
  const comp = useComponent((c) => ({ from: c.from, duration: c.duration }), id);
  const { width, scale } = useTimelineWidth();
  const verticalGuidelines = useGuidelines(id);
  if (!comp) return null;
  return (
    <Moveable
      target={document.getElementById(`timeline-${id}`)}
      bounds={{ left: 0, rigth: width }}
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
        editComponent({ from: comp.from + delta[0] / scale }, true);
      }}
      onResize={({ width, delta, target, direction }) => {
        console.log(direction);
        editComponent(
          {
            from: direction[0] === -1 ? comp.from + comp.duration - width / scale : comp.from,
            duration: width / scale,
          },
          true
        );
        if (delta[0]) {
          target.style.width = `${width}px`;
        }
      }}
    />
  );
};
