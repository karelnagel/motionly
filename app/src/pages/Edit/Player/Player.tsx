import { useRef } from "react";
import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "../../../player";
import { useComponent, useTemplateStore, useTemplate, usePlayerStore } from "../../../store";
import { useShiftKey } from "../../../hooks/useShiftKey";

export const Player = () => {
  const template = useTemplate();
  const comp = useComponent();
  const setComponent = useTemplateStore((t) => t.setComponent);
  const divRef = useRef<HTMLDivElement>(null);
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
        selectedRef={divRef}
        selected={comp?.id || ""}
        setSelected={setComponent}
      />
      <Move divRef={divRef} />
    </div>
  );
};
const useGuidelines = (scale: number) => {
  const template = useTemplate();
  const component = useTemplateStore((t) => t.component);
  const comps = Object.values(template.components).filter((c) => c.id !== component);
  const vertical = [...comps.map((c) => c.x || 0), ...comps.map((c) => (c.x || 0) + (c.width || 0)), 0, template.width / 2, template.width].map(
    (c) => c * scale
  );
  const horizontal = [...comps.map((c) => c.y || 0), ...comps.map((c) => (c.y || 0) + (c.height || 0)), 0, template.height / 2, template.height].map(
    (c) => c * scale
  );
  return { vertical, horizontal };
};

const Move = ({ divRef }: { divRef: any }) => {
  const comp = useComponent();
  const editComponent = useTemplateStore((t) => t.editComponent);
  const lockAspectRatio = useShiftKey();
  const scale = usePlayerStore((t) => t.playerScale);
  const { vertical, horizontal } = useGuidelines(scale);
  return (
    <Moveable
      target={divRef}
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
          true
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
          true
        );
        if (delta[0]) {
          target.style.width = `${width}px`;
        }
        if (delta[1]) {
          target.style.height = `${height}px`;
        }
      }}
      onRotate={({ absoluteRotation }) => editComponent({ rotation: absoluteRotation }, true)}
    />
  );
};
