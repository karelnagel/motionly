import { useRef } from "react";
import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "@motionly/player";
import { useComponent, useStore, useTemplate } from "../../../store";
import { useShiftKey } from "../../../hooks/useShiftKey";

export const Player = () => {
  const template = useTemplate();
  const comp = useComponent();
  const setComponent = useStore((t) => t.setComponent);
  const editComponent = useStore((t) => t.editComponent);
  const lockAspectRatio = useShiftKey();
  const divRef = useRef<HTMLDivElement>(null);
  const scale = useStore((t) => t.playerScale);
  const setPlayerRef = useStore((t) => t.playerSetPlayerRef);
  const horizontalGuidelines: number[] = [];
  const verticalGuidelines: number[] = [];
  return (
    <div
      style={{
        width: template.width * scale,
        height: template.height * scale,
        position: "relative",
      }}
    >
      <MotionlyPlayer
        className="bg-white"
        ref={(ref) => setPlayerRef?.(ref || undefined)}
        template={template}
        style={{ width: "100%", height: "100%" }}
        spaceKeyToPlayOrPause
        loop
        selectedRef={divRef}
        selected={comp?.id || ""}
        setSelected={setComponent}
      />
      {comp && (
        <Moveable
          target={divRef}
          scale={scale}
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
          verticalGuidelines={verticalGuidelines}
          horizontalGuidelines={horizontalGuidelines}
          onDrag={({ delta }) => {
            editComponent({
              left: (comp.left || 0) + delta[0],
              top: (comp.top || 0) + delta[1],
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={({ height, width, delta, target, direction }) => {
            editComponent({
              left: direction[0] === -1 ? (comp.left || 0) + (comp.width || template.width) - width : comp.left,
              top: direction[1] === -1 ? (comp.top || 0) + (comp.height || template.height) - height : comp.top,
              width: width,
              height: height,
            });
            if (delta[0]) {
              target.style.width = `${width}px`;
            }
            if (delta[1]) {
              target.style.height = `${height}px`;
            }
          }}
          onRotate={({ absoluteRotation }) => editComponent({ rotation: absoluteRotation })}
        />
      )}
    </div>
  );
};
