import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { ComponentProps, TemplateType } from "@asius/components";
import { Composition, SelectedContext } from "../../../../components/dist";
import { RefObject, useRef, useState } from "react";
import { useShiftKey } from "../../../hooks/useShiftKey";
import Moveable from "react-moveable";
import { useEffect } from "react";

export const Player = ({
  template: { width, height, duration, fps, comps },
  playerRef,
  scale,
  setComp,
  setSelected,
  selectedComp,
}: {
  setComp: (comp: ComponentProps) => void;
  setSelected: (s: string) => void;
  scale: number;
  template: TemplateType;
  playerRef: RefObject<PlayerRef>;
  selectedComp: ComponentProps | null;
}) => {
  const lockAspectRatio = useShiftKey();
  const divRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <div
      style={{ width: width * scale, height: height * scale }}
      className="relative"
    >
      <SelectedContext.Provider
        value={{ divRef, setSelected, selected: selectedComp?.id || "" }}
      >
        <RemotionPlayer
          ref={playerRef}
          component={Composition}
          compositionHeight={height}
          compositionWidth={width}
          durationInFrames={duration * fps}
          fps={fps}
          inputProps={{
            comps: isClient ? comps : [],
            width,
            height,
          }}
          style={{ width: "100%", height: "100%" }}
          spaceKeyToPlayOrPause
          className="bg-base-100"
          loop
        />
      </SelectedContext.Provider>
      {selectedComp && (
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
          horizontalGuidelines={[
            ...comps
              .filter((c) => c.id !== selectedComp.id)
              .map((c) => [c.x, (c.x || 0) + (c.width || 0)])
              .flat()
              .filter((x) => x),
            0,
            width / 2,
            width,
          ].map((x) => (x || 0) * scale)}
          verticalGuidelines={[
            ...comps
              .filter((c) => c.id !== selectedComp.id)
              .map((c) => [c.y, (c.y || 0) + (c.height || 0)])
              .flat()
              .filter((x) => x),
            0,
            height / 2,
            height,
          ].map((x) => (x || 0) * scale)}
          onDrag={(e) => {
            setComp({
              ...selectedComp,
              x: (selectedComp.x || 0) + e.delta[0],
              y: (selectedComp.y || 0) + e.delta[1],
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={({ height, width, delta, target }) => {
            setComp({
              ...selectedComp,
              width: width || 1,
              height: height || 1,
            });
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
          }}
          onRotate={(e) => {
            setComp({ ...selectedComp, rotation: e.absoluteRotation });
          }}
        />
      )}
    </div>
  );
};
