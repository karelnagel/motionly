import { PlayerRef } from "@remotion/player";
import { SelectedContext } from "@motionly/components";
import { RefObject, useRef } from "react";
import { useShiftKey } from "../../../../hooks/useShiftKey";
import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "@motionly/player";
import { useComponent, useStore } from "../../../../hooks/useStore";

export const Player = ({
  playerRef,
  scale,
}: {
  playerRef: RefObject<PlayerRef>;
  scale: number;
}) => {
  const template = useStore((t) => t.project.template);
  const comp = useComponent();
  const setSelected = useStore((t) => t.setSelected);
  const set = useStore((t) => t.set);

  const lockAspectRatio = useShiftKey();
  const divRef = useRef<HTMLDivElement>(null);
  const { width, height } = template;
  return (
    <div
      style={{ width: template.width * scale, height: template.height * scale }}
      className="absolute"
    >
      <SelectedContext.Provider
        value={{ divRef, setSelected, selected: comp?.id || "" }}
      >
        <MotionlyPlayer
          playerRef={playerRef}
          template={template}
          style={{ width: "100%", height: "100%" }}
          spaceKeyToPlayOrPause
          className="bg-base-100"
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
          snapThreshold={5}
          snapCenter={true}
          centerGuidelines={true}
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
          // horizontalGuidelines={[
          //   ...comps
          //     .filter((c) => c.id !== comp.id)
          //     .map((c) => [c.x, (c.x || 0) + (c.width || 0)])
          //     .flat()
          //     .filter((x) => x),
          //   0,
          //   width / 2,
          //   width,
          // ].map((x) => (x || 0) * scale)}
          // verticalGuidelines={[
          //   ...comps
          //     .filter((c) => c.id !== comp.id)
          //     .map((c) => [c.y, (c.y || 0) + (c.height || 0)])
          //     .flat()
          //     .filter((x) => x),
          //   0,
          //   height / 2,
          //   height,
          // ].map((x) => (x || 0) * scale)}
          onDrag={(e) => {
            set((s) => {
              const comp = s.project.template.components[s.selected];
              comp.x = (comp.x || 0) + e.delta[0];
              comp.y = (comp.y || 0) + e.delta[1];
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={({ height, width, delta, target }) => {
            set((s) => {
              const comp = s.project.template.components[s.selected];
              comp.width = width;
              comp.height = height;
            });
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
          }}
          onRotate={(e) =>
            set((s) => {
              s.project.template.components[s.selected].rotation =
                e.absoluteRotation;
            })
          }
        />
      )}
    </div>
  );
};
