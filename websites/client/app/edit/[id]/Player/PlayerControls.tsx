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
import { useTemplate } from "../../../../hooks/useTemplate";
import { useCurrentPlayerFrame } from "../../../../hooks/useCurrentPlayerFrame";

export const PlayerControls = ({
  scale,
  setScale,
  playerRef,
}: {
  scale?: number;
  setScale: (s?: number) => void;
  playerRef: RefObject<PlayerRef>;
}) => {
  const fps = useTemplate((t) => t.project.template.fps);
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
    <div className="pt-0 p-3 shrink-0 w-full relative">
      <div className="w-full grid grid-cols-3 panel text-3xl p-3">
        <input
          type="number"
          value={frame ? Math.round(frame / fps) : 0}
          onChange={(e) =>
            playerRef.current?.seekTo(Number(e.currentTarget.value) * fps || 0)
          }
          className="text-lg w-10 bg-base-200 rounded-lg p-1"
        />
        <div className="w-full h-full flex items-center justify-center space-x-5">
          <div className="tooltip" data-tip="M">
            {playerRef.current?.isMuted() ? (
              <IoIosVolumeOff
                onClick={playerRef.current?.unmute}
                className={className}
              />
            ) : (
              <IoIosVolumeHigh
                onClick={playerRef.current?.mute}
                className={className}
              />
            )}
          </div>
          <div className="tooltip" data-tip="← / J">
            <IoIosSkipBackward
              className={className}
              onClick={() => playerRef.current?.seekTo(frame - 5 * fps)}
            />
          </div>
          <div className="tooltip" data-tip="⎵">
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
          </div>

          <div className="tooltip" data-tip="→ / L">
            <IoIosSkipForward
              className={className}
              onClick={() => playerRef.current?.seekTo(frame + 5 * fps)}
            />
          </div>
          <div className="tooltip" data-tip="F">
            <IoMdExpand
              className={className}
              onClick={() => playerRef.current?.requestFullscreen()}
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-full space-x-2">
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.01}
            value={scale === undefined ? 0 : scale}
            className="w-24 range-primary range range-sm"
            onChange={(e) =>
              setScale(e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <input
            type="number"
            className="text-base w-12 overflow-hidden bg-base-200 p-2 rounded-lg"
            value={scale === undefined ? "" : scale}
            onChange={(e) =>
              setScale(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>
    </div>
  );
};
