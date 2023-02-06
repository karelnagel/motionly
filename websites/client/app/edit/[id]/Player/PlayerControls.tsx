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
import { useProject } from "../../../../hooks/useStore";
import { useCurrentPlayerFrame } from "../../../../hooks/useCurrentPlayerFrame";

export const PlayerControls = ({
  playerRef,
}: {
  playerRef: RefObject<PlayerRef>;
}) => {
  const fps = useProject((t) => t.project.template.fps);
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
    <div className=" shrink-0 w-full text-3xl p-3 flex items-center justify-center space-x-5">
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
          <IoIosPlay onClick={playerRef.current?.play} className={className} />
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
  );
};
