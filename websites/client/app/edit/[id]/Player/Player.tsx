import { PlayerRef } from "@remotion/player";
import { SelectedContext } from "@motionly/components";
import { RefObject, useRef } from "react";
import { useShiftKey } from "../../../../hooks/useShiftKey";
import Moveable from "react-moveable";
import { Player as MotionlyPlayer } from "@motionly/player";
import { useProject } from "../../../../hooks/useStore";
import { useComponent } from "../../../../hooks/useComponent";

export const Player = ({
  playerRef,
  scale,
}: {
  playerRef: RefObject<PlayerRef>;
  scale: number;
}) => {
  const template = useProject((t) => t.project.template);
  const comp = useComponent();
  const setSelected = useProject((t) => t.setSelected);
  const setComp = useProject((t) => t.setComp);

  const lockAspectRatio = useShiftKey();
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div
      style={{ width: template.width * scale, height: template.height * scale }}
    >
      <SelectedContext.Provider
        value={{ divRef, setSelected, selected: comp?.id || "" }}
      >
        <MotionlyPlayer
          playerRef={playerRef}
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
            setComp((comp) => {
              comp.x = (comp.x || 0) + e.delta[0];
              comp.y = (comp.y || 0) + e.delta[1];
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={({ height, width, delta, target }) => {
            setComp((comp) => {
              comp.width = width;
              comp.height = height;
            });
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
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
