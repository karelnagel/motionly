import { useStore } from "../../../store";
import {
  IoIosTrash,
  IoIosCopy,
  IoIosVolumeOff,
  IoIosVolumeHigh,
  IoIosSkipBackward,
  IoIosPause,
  IoIosPlay,
  IoIosSkipForward,
  IoMdExpand,
  IoIosRemove,
  IoIosAdd,
} from "react-icons/io";
import { IconType } from "react-icons";

export const TopBar = () => {
  const setWidth = useStore((t) => t.timelineSetWidth);
  const selected = useStore((t) => t.component);
  const copy = useStore((t) => t.copyComponent);
  const width = useStore((t) => t.timelineWidth);
  const deleteComp = useStore((t) => t.deleteComp);
  const fps = useStore((t) => t.templates[t.template].fps);
  const playerRef = useStore((t) => t.playerRef);
  const isPlaying = useStore((t) => t.isPlaying);
  const frame = useStore((t) => t.frame);
  return (
    <div className="flex justify-between py-2 px-2 border-b border-base-300 items-center">
      <div className="flex space-x-2 items-center">
        <Button Icon={IoIosTrash} disabled={!selected} onClick={() => deleteComp()} tooltip="Delete" />
        <Button Icon={IoIosCopy} disabled={!selected} onClick={() => copy()} tooltip="Ctrl + C" />
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
