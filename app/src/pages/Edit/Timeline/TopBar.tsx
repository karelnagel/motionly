import { usePlayerRef, usePlayerStore, useTemplateStore, useTimelineStore } from "../../../store";
import {
  IoMdCopy,
  IoIosVolumeOff,
  IoIosVolumeHigh,
  IoIosSkipBackward,
  IoIosPause,
  IoIosPlay,
  IoIosSkipForward,
  IoMdExpand,
  IoIosRemove,
  IoIosAdd,
  IoMdTrash,
} from "react-icons/io";
import { IconType } from "react-icons";

export const TopBar = () => {
  const setWidth = useTimelineStore((t) => t.setWidth);
  const selected = useTemplateStore((t) => t.component);
  const copy = useTemplateStore((t) => t.copyComponent);
  const width = useTimelineStore((t) => t.width);
  const deleteComp = useTemplateStore((t) => t.deleteComp);
  const fps = useTemplateStore((t) => t.templates[t.template || ""].fps);
  const playerRef = usePlayerRef();
  const isPlaying = usePlayerStore((t) => t.isPlaying);
  const frame = usePlayerStore((t) => t.frame);
  return (
    <div className="flex justify-between py-1 px-2 shadow-md items-center">
      <div className="flex space-x-2 items-center">
        <Button Icon={IoMdTrash} disabled={!selected} onClick={() => deleteComp()} tooltip="Delete" />
        <Button Icon={IoMdCopy} disabled={!selected} onClick={() => copy()} tooltip="Ctrl + C" />
      </div>
      <div className="flex items-center justify-center space-x-5">
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
      <div className="text-xl flex items-center space-x-2">
        <Button Icon={IoIosRemove} onClick={() => setWidth(width / 1.1)} />
        <Button Icon={IoIosAdd} onClick={() => setWidth(width * 1.1)} />
      </div>
    </div>
  );
};
const Button = ({ Icon, onClick, disabled, tooltip }: { Icon: IconType; onClick: () => void; disabled?: boolean; tooltip?: string }) => {
  return (
    <div className={tooltip ? "tooltip tooltip-bottom" : ""} data-tip={tooltip}>
      <button disabled={disabled} onClick={() => onClick()} className="text-xl rounded-lg aspect-square hover:bg-base-200 p-1 cursor-pointer">
        <Icon />
      </button>
    </div>
  );
};
