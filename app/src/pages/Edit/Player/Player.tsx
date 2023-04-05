import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "../../../player";
import { useComponent, useTemplateStore, useTemplate, usePlayerStore } from "../../../store";
import { useShiftKey } from "../../../hooks/useShiftKey";

export const Player = () => {
  const template = useTemplate();
  const selected = useTemplateStore((s) => s.template);
  const setComponent = useTemplateStore((t) => t.setComponent);
  const scale = usePlayerStore((t) => t.playerScale);
  const setPlayerRef = usePlayerStore((t) => t.setPlayerRef);
  return (
    <div
      className="bg-base-100"
      style={{
        width: template.width * scale,
        height: template.height * scale,
        position: "relative",
      }}
    >
      <MotionlyPlayer
        ref={(ref) => setPlayerRef?.(ref || undefined)}
        template={template}
        style={{ width: "100%", height: "100%" }}
        spaceKeyToPlayOrPause
        loop
        component={selected}
        setComponent={setComponent}
      />
      <Move />
    </div>
  );
};
const useGuidelines = (scale: number) => {
  const comps = useTemplate((t, s) => Object.values(t.components).filter((c) => c.id !== s.component));
  const width = useTemplate((t) => t.width);
  const height = useTemplate((t) => t.height);
  const vertical = [...comps.map((c) => c.x || 0), ...comps.map((c) => (c.x || 0) + (c.width || 0)), 0, width / 2, width].map((c) => c * scale);
  const horizontal = [...comps.map((c) => c.y || 0), ...comps.map((c) => (c.y || 0) + (c.height || 0)), 0, height / 2, height].map((c) => c * scale);
  return { vertical, horizontal };
};

const Move = () => {
  const comp = useComponent((c) => ({ x: c.x, y: c.y, width: c.width, height: c.height, rotation: c.rotation, id: c.id }));
  const editComponent = useTemplateStore((t) => t.editComponent);
  const lockAspectRatio = useShiftKey();
  const scale = usePlayerStore((t) => t.playerScale);
  const { vertical, horizontal } = useGuidelines(scale);
  if (!comp) return null;
  return (
    <Moveable
      target={document.getElementById(comp.id)}
      scale={scale}
      stopPropagation={true}
      preventClickDefault={true}
      preventClickEventOnDrag={true}
      edgeDraggable
      draggable={true}
      resizable={true}
      rotatable={true}
      snappable={true}
      snapDirections={{
        center: true,
        middle: true,
        top: true,
        bottom: true,
        right: true,
        left: true,
      }}
      elementSnapDirections={{
        top: true,
        bottom: true,
        right: true,
        left: true,
      }}
      snapThreshold={3}
      verticalGuidelines={vertical}
      horizontalGuidelines={horizontal}
      onDrag={({ delta }) => {
        editComponent(
          {
            x: (comp.x || 0) + delta[0],
            y: (comp.y || 0) + delta[1],
          },
          true,
          undefined
        );
      }}
      keepRatio={lockAspectRatio}
      onResize={({ height, width, delta, target, direction }) => {
        editComponent(
          {
            x: direction[0] === -1 ? (comp.x || 0) + comp.width - width : comp.x,
            y: direction[1] === -1 ? (comp.y || 0) + comp.height - height : comp.y,
            width: width,
            height: height,
          },
          true,
          undefined
        );
        if (delta[0]) {
          target.style.width = `${width}px`;
        }
        if (delta[1]) {
          target.style.height = `${height}px`;
        }
      }}
      onRotate={({ absoluteRotation }) => editComponent({ rotation: absoluteRotation }, true, undefined)}
    />
  );
};
