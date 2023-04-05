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

const useTimelineWidth = (id: string) => {
  const duration = useTemplate((t) => t.duration || 1);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = document.getElementById(`timeline-${id}`);
    if (!el) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].target.clientWidth);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);
  return { width, scale: width / duration, duration };
};

export const Component = ({ id }: { id: string }) => {
  const comp = useComponent(selector, id);
  const editComponent = useTemplateStore((t) => t.editComponent);
  const setComponent = useTemplateStore((t) => t.setComponent);
  const isSelected = useTemplateStore((t) => t.component === id);
  if (!comp) return null;
  const timeline = useTimelineWidth(id);
  const ref = useRef<HTMLDivElement>(null);
  const left = comp.from * timeline.scale;
  let width = comp.duration * timeline.scale;
  if (left + width > timeline.width) width = timeline.width - left;
  return (
    <div id={`timeline-${id}`} className="w-full relative h-[26px] shrink-0">
      <div
        ref={ref}
        onClick={() => setComponent(id)}
        className="h-full absolute rounded-[2px] flex space-x-1 px-2 items-center cursor-pointer overflow-hidden"
        style={{
          left: left,
          width: width,
          background: `hsl(${comp.hue}, ${isSelected ? 85 : 55}%, ${isSelected ? 65 : 45}%, 100%)`,
        }}
      >
        <comp.Icon />
        <p className="text-sm">{comp.title}</p>
      </div>
      {width && (
        <Moveable
          target={ref}
          bounds={{ left: 0 }}
          resizable={true}
          draggable={true}
          renderDirections={["w", "e"]}
          hideDefaultLines
          onDrag={({ delta }) => {
            const from = comp.from + delta[0] / timeline.scale;
            if (from + comp.duration > timeline.duration || from < 0) return;
            editComponent({ from }, true, id);
          }}
          onResize={({ width, delta, target, direction }) => {
            console.log(direction);
            const from = direction[0] === -1 ? comp.from + comp.duration - width / timeline.scale : comp.from;
            let duration = width / timeline.scale;
            if (from + duration > timeline.duration) duration = timeline.duration - from;
            editComponent({ from, duration }, true, id);
            if (delta[0]) {
              target.style.left = `${from * timeline.scale}px`;
              target.style.width = `${duration * timeline.scale}px`;
            }
          }}
        />
      )}
    </div>
  );
};
