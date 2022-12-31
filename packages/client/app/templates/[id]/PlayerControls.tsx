import { PlayerRef } from "@remotion/player";
import { RefObject, useEffect, useState } from "react";
import {
  IoIosPlay,
  IoIosPause,
  IoIosSkipForward,
  IoIosSkipBackward,
  IoIosVolumeHigh,
  IoIosVolumeOff,
  IoMdExpand,
} from "react-icons/io";
import { useCurrentPlayerFrame } from "../../../hooks/useCurrentPlayerFrame";

export const PlayerControls = ({
  scale,
  setScale,
  playerRef,
  fps,
}: {
  scale: number;
  setScale: (s: number) => void;
  playerRef: RefObject<PlayerRef>;
  fps: number;
}) => {
  const frame = useCurrentPlayerFrame(playerRef);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }
    playerRef.current.addEventListener("play", () => {
      setIsPlaying(true);
    });
    playerRef.current.addEventListener("pause", () => {
      setIsPlaying(false);
    });
  }, [playerRef.current]);

  const className =
    "cursor-pointer w-[45px] aspect-square p-1 font-bold hover:text-primary hover:shadow-md hover:scale-110 duration-150 rounded-full";
  return (
    <div className="absolute bottom-0 left-0 p-3 w-full">
      <div className="w-full grid grid-cols-3 panel text-3xl p-3">
        <input
          type="number"
          value={frame ? Math.round(frame / fps) : 0}
          onChange={(e) =>
            playerRef.current?.seekTo(Number(e.currentTarget.value) * fps || 0)
          }
          className="text-xl w-10"
        />
        <div className="w-full h-full flex items-center justify-center space-x-5">
          {playerRef.current?.isMuted() ? (
            <IoIosVolumeHigh
              onClick={playerRef.current?.unmute}
              className={className}
            />
          ) : (
            <IoIosVolumeOff
              onClick={playerRef.current?.mute}
              className={className}
            />
          )}
          <IoIosSkipBackward
            className={className}
            onClick={() => playerRef.current?.seekTo(frame - 5 * fps)}
          />
          {isPlaying ? (
            <IoIosPause
              onClick={playerRef.current?.pause}
              className={className}
            />
          ) : (
            <IoIosPlay
              onClick={playerRef.current?.play}
              className={className}
            />
          )}
          <IoIosSkipForward
            className={className}
            onClick={() => playerRef.current?.seekTo(frame + 5 * fps)}
          />
          <IoMdExpand
            className={className}
            onClick={() => playerRef.current?.requestFullscreen()}
          />
        </div>
        <div className="flex items-center justify-end w-full space-x-2">
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.01}
            value={scale}
            className="w-20 range-primary range range-sm"
            onChange={(e) => setScale(Number(e.target.value))}
          />
          <p className="text-base">{scale}</p>
        </div>
      </div>
    </div>
  );
};
