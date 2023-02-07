import { useEffect, useRef } from "react";
import { usePlayer } from "../../../../hooks/usePlayer";
import { useProject } from "../../../../hooks/useProject";
import { Header } from "./Header";
import { Player } from "./Player";
import { PlayerControls } from "./PlayerControls";

export const PlayerDiv = () => {
  const playerDivRef = useRef<HTMLDivElement>(null);
  const setScale = usePlayer((t) => t.setScale);
  const template = useProject((t) => t.project.template);
  const setSelected = useProject((t) => t.setSelected);
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
        onClick={() => setSelected(undefined)}
        className="flex items-center justify-center h-full relative mx-2"
      >
        <div className="absolute top-0 left-0 h-full w-full max-w-full flex items-center justify-center">
          <Player />
        </div>
      </div>
      <PlayerControls />
    </div>
  );
};
