import {
  IoIosPlay,
  IoIosPause,
  IoIosSkipForward,
  IoIosSkipBackward,
  IoIosVolumeHigh,
  IoIosVolumeOff,
  IoMdExpand,
} from "react-icons/io";
import { useProject } from "../../../../hooks/useProject";

export const PlayerControls = () => {
  const fps = useProject((t) => t.project.template.fps);
  const playerRef = useProject((t) => t.player.playerRef);
  const isPlaying = useProject((t) => t.player.isPlaying);
  const frame = useProject((t) => t.player.frame);
  const className =
    "cursor-pointer w-[45px] aspect-square p-1 font-bold hover:text-primary hover:shadow-md hover:scale-110 duration-150 rounded-full";
  return (
    <div className=" shrink-0 w-full text-3xl p-3 flex items-center justify-center space-x-5">
      <div className="tooltip" data-tip="M">
        {playerRef?.isMuted() ? (
          <IoIosVolumeOff onClick={playerRef?.unmute} className={className} />
        ) : (
          <IoIosVolumeHigh onClick={playerRef?.mute} className={className} />
        )}
      </div>
      <div className="tooltip" data-tip="← / J">
        <IoIosSkipBackward
          className={className}
          onClick={() => playerRef?.seekTo(frame - 5 * fps)}
        />
      </div>
      <div className="tooltip" data-tip="⎵">
        {isPlaying ? (
          <IoIosPause onClick={playerRef?.pause} className={className} />
        ) : (
          <IoIosPlay onClick={playerRef?.play} className={className} />
        )}
      </div>

      <div className="tooltip" data-tip="→ / L">
        <IoIosSkipForward
          className={className}
          onClick={() => playerRef?.seekTo(frame + 5 * fps)}
        />
      </div>
      <div className="tooltip" data-tip="F">
        <IoMdExpand
          className={className}
          onClick={() => playerRef?.requestFullscreen()}
        />
      </div>
    </div>
  );
};
