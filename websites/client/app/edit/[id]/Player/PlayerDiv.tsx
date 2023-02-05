import { PlayerRef } from "@remotion/player";
import { RefObject, useEffect, useRef, useState } from "react";
import { useStore } from "../../../../hooks/useStore";
import { Header } from "./Header";
import { Player } from "./Player";
import { PlayerControls } from "./PlayerControls";

export const PlayerDiv = ({
  playerRef,
}: {
  playerRef: RefObject<PlayerRef>;
}) => {
  const playerDivRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();
  const template = useStore((t) => t.project.template);
  const getScale = () => {
    if (
      playerDivRef.current?.clientHeight &&
      playerDivRef.current?.clientWidth
    ) {
      const scaleX = playerDivRef.current.clientWidth / template.width;
      const scaleY = playerDivRef.current.clientHeight / template.height;
      setScale(Math.min(scaleX, scaleY));
    }
  };
  useEffect(() => {
    new ResizeObserver(() => {
      getScale();
    }).observe(playerDivRef.current as Element);
    return () => {
      new ResizeObserver(() => {
        getScale();
      }).disconnect();
    };
  }, []);
  return (
    <div className="w-full relative h-full overflow-hidden flex flex-col bg-base-200">
      <Header />
      <div
        ref={playerDivRef}
        className="flex items-center justify-center h-full relative mx-2"
      >
        <div className="absolute top-0 left-0 h-full w-full max-w-full flex items-center justify-center">
          <Player playerRef={playerRef} scale={scale || 0.2} />
        </div>
      </div>
      <PlayerControls playerRef={playerRef} />
    </div>
  );
};
