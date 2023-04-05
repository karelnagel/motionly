import { usePlayerRef, usePlayerStore, useTemplate, useTemplateStore } from "../../../store";
import {
  IoMdCopy,
  IoIosVolumeOff,
  IoIosVolumeHigh,
  IoIosSkipBackward,
  IoIosPause,
  IoIosPlay,
  IoIosSkipForward,
  IoMdExpand,
  IoMdTrash,
} from "react-icons/io";

export const TopBar = () => {
  const selected = useTemplateStore((t) => t.component);
  const copy = useTemplateStore((t) => t.copyComponent);
  const deleteComp = useTemplateStore((t) => t.deleteComp);
  const fps = useTemplate((t) => t.fps);
  const playerRef = usePlayerRef();
  const isPlaying = usePlayerStore((t) => t.isPlaying);
  const frame = usePlayerStore((t) => t.frame);
  return (
    <div className="grid grid-cols-11 py-1 px-2 shadow-md items-center">
      <input
        type="number"
        value={frame === 0 ? "" : Math.round((frame / fps) * 100) / 100}
        onChange={(e) => playerRef?.seekTo(Number(e.target.value) * fps)}
        className="bg-transparent outline-none"
      />
      <div className="flex items-center justify-center space-x-5 col-span-9">
        <Button
          Icon={playerRef?.isMuted ? IoIosVolumeOff : IoIosVolumeHigh}
          onClick={() => (playerRef?.isMuted() ? playerRef?.unmute() : playerRef?.mute())}
          tooltip="M"
        />
        <Button Icon={IoIosSkipBackward} onClick={() => playerRef?.seekTo(frame - 5 * fps)} tooltip="← / J" />
        <Button Icon={isPlaying ? IoIosPause : IoIosPlay} onClick={() => playerRef?.toggle()} tooltip="⎵" />
        <Button Icon={IoIosSkipForward} onClick={() => playerRef?.seekTo(frame + 5 * fps)} tooltip="→ / L" />
        <Button Icon={IoMdExpand} onClick={() => playerRef?.requestFullscreen()} tooltip="F" />
      </div>
      <div className="flex space-x-2 items-center justify-end">
        <Button Icon={IoMdTrash} disabled={!selected} onClick={() => deleteComp()} tooltip="Delete" />
        <Button Icon={IoMdCopy} disabled={!selected} onClick={() => copy()} tooltip="Ctrl + C" />
      </div>
    </div>
  );
};
const Button = ({ Icon, onClick, disabled, tooltip }: { Icon: React.FC; onClick: () => void; disabled?: boolean; tooltip?: string }) => {
  return (
    <div className={`${tooltip ? "tooltip tooltip-bottom" : ""}`} data-tip={tooltip}>
      <button disabled={disabled} onClick={() => onClick()} className="btn-ghost">
        <Icon />
      </button>
    </div>
  );
};
