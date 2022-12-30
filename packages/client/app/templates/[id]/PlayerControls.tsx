import { PlayerRef } from "@remotion/player";
import { RefObject } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  MdFastRewind,
  MdForward,
  MdFullscreen,
  MdPause,
  MdPlayArrow,
  MdVolumeMute,
  MdVolumeUp,
} from "react-icons/md";

export const PlayerControls = ({
  scale,
  setScale,
  playerRef,
  frame,
  isPlaying,
  fps,
}: {
  scale: number;
  setScale: (s: number) => void;
  playerRef: RefObject<PlayerRef>;
  frame: number;
  isPlaying: boolean;
  fps: number;
}) => {
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
        <div className="w-full h-full flex items-center justify-center">
          {playerRef.current?.isMuted() ? (
            <MdVolumeUp
              onClick={playerRef.current?.unmute}
              className="cursor-pointer"
            />
          ) : (
            <MdVolumeMute
              onClick={playerRef.current?.mute}
              className="cursor-pointer"
            />
          )}
          <MdFastRewind
            className="cursor-pointer"
            onClick={() => playerRef.current?.seekTo(frame - 5 * fps)}
          />
          {isPlaying ? (
            <MdPause
              onClick={playerRef.current?.pause}
              className="cursor-pointer"
            />
          ) : (
            <MdPlayArrow
              onClick={playerRef.current?.play}
              className="cursor-pointer"
            />
          )}
          <MdForward
            className="cursor-pointer"
            onClick={() => playerRef.current?.seekTo(frame + 5 * fps)}
          />
          <MdFullscreen
            className="cursor-pointer"
            onClick={() => playerRef.current?.requestFullscreen()}
          />
        </div>
        <div className="flex items-center justify-end w-full">
          <AiOutlineMinus
            onClick={() => setScale(scale - 0.05)}
            className="cursor-pointer hover:scale-110"
          />
          <input
            value={scale || 0}
            className="w-10 text-center hover:scale-105 text-lg"
            onChange={(e) => setScale(Number(e.target.value) || 0)}
          />
          <AiOutlinePlus
            onClick={() => setScale(scale + 0.05)}
            className="cursor-pointer hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};
