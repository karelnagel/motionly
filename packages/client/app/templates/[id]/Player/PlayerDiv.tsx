import { PlayerRef } from "@remotion/player";
import { RefObject, useEffect, useRef, useState } from "react";
import { useTemplate } from "../../../../hooks/useTemplate";
import { Player } from "./Player";
import { PlayerControls } from "./PlayerControls";

export const PlayerDiv = ({
  playerRef,
}: {
  playerRef: RefObject<PlayerRef>;
}) => {
  const playerDivRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();
  const { template } = useTemplate();
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
    <div className="w-full relative h-full overflow-hidden flex flex-col">
      <div
        ref={playerDivRef}
        className="flex items-center justify-center h-full relative m-4"
      >
        <Player playerRef={playerRef} scale={scale || 0.2} />
      </div>
      <PlayerControls scale={scale} setScale={setScale} playerRef={playerRef} />
    </div>
  );
};
