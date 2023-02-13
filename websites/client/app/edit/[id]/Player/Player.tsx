import { SelectedContext } from "@motionly/components";
import { useRef } from "react";
import { useShiftKey } from "../../../../hooks/useShiftKey";
import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "@motionly/player";
import { useProject } from "../../../../hooks/useProject";
import { useComponent } from "../../../../hooks/useComponent";

export const Player = () => {
  const template = useProject((t) => t.project.template);
  const comp = useComponent();
  const setSelected = useProject((t) => t.setSelected);
  const setComp = useProject((t) => t.setComp);
  const lockAspectRatio = useShiftKey();
  const divRef = useRef<HTMLDivElement>(null);
  const scale = useProject((t) => t.playerScale);
  const setPlayerRef = useProject((t) => t.playerSetPlayerRef);
  const horizontalGuidelines = [
    ...Object.values(template.components)
      .filter((c) => c.id !== comp?.id)
      .map((c) => [c.y, (c.y || 0) + (c.height || template.height)])
      .flat(),
    0,
    template.height / 2,
    template.height,
  ].map((x) => (x || 0) * scale);
  const verticalGuidelines = [
    ...Object.values(template.components)
      .filter((c) => c.id !== comp?.id)
      .map((c) => [c.x, (c.x || 0) + (c.width || template.width)])
      .flat(),
    0,
    template.width / 2,
    template.width,
  ].map((x) => (x || 0) * scale);

  return (
    <div
      style={{
        width: template.width * scale,
        height: template.height * scale,
        position: "relative",
      }}
    >
      <SelectedContext.Provider
        value={{ divRef, setSelected, selected: comp?.id || "" }}
      >
        <MotionlyPlayer
          ref={(ref) => setPlayerRef?.(ref || undefined)}
          template={template}
          style={{ width: "100%", height: "100%" }}
          spaceKeyToPlayOrPause
          loop
        />
      </SelectedContext.Provider>
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
            setComp((comp) => {
              comp.x = (comp.x || 0) + delta[0];
              comp.y = (comp.y || 0) + delta[1];
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={({ height, width, delta, target, direction }) => {
            setComp((comp) => {
              console.log(direction);
              if (direction[0] === -1)
                comp.x = (comp.x || 0) + (comp.width || template.width) - width;
              if (direction[1] === -1)
                comp.y =
                  (comp.y || 0) + (comp.height || template.height) - height;
              comp.width = width;
              comp.height = height;
            });
            if (delta[0]) {
              target.style.width = `${width}px`;
            }
            if (delta[1]) {
              target.style.height = `${height}px`;
            }
          }}
          onRotate={(e) =>
            setComp((comp) => {
              comp.rotation = e.absoluteRotation;
            })
          }
        />
      )}
    </div>
  );
};
