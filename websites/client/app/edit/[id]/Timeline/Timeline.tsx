import { IoIosAdd, IoIosCopy, IoIosRemove, IoIosTrash } from "react-icons/io";
import { useProject } from "../../../../hooks/useProject";
import { TimelineComp } from "./TimelineComp";
import {
  IoIosPlay,
  IoIosPause,
  IoIosSkipForward,
  IoIosSkipBackward,
  IoIosVolumeHigh,
  IoIosVolumeOff,
  IoMdExpand,
} from "react-icons/io";
import { IconType } from "react-icons/lib";

export const Timeline = () => {
  const template = useProject((t) => t.project.template);
  const width = useProject((t) => t.timelineWidth);

  return (
    <div className=" h-full relative flex flex-col">
      <TopBar />
      <div className=" w-full h-full overflow-x-auto">
        <div
          className="h-full w-full flex flex-col"
          style={{ width: `${width}%` }}
        >
          <TimelineBar duration={template.duration} fps={template.fps} />
          <div className="overflow-y-scroll h-full overflow-x-hidden px-3 pb-2">
            <div className="flex flex-col space-y-2">
              {template.childIds?.map((id, i) => (
                <TimelineComp
                  key={id}
                  id={id}
                  parentDuration={template.duration}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Button = ({
  Icon,
  onClick,
  disabled,
  tooltip,
}: {
  Icon: IconType;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
}) => {
  return (
    <div className={tooltip ? "tooltip tooltip-bottom" : ""} data-tip={tooltip}>
      <button
        disabled={disabled}
        onClick={() => onClick()}
        className="btn btn-ghost btn-sm btn-square text-xl"
      >
        <Icon />
      </button>
    </div>
  );
};
export const TopBar = () => {
  const setWidth = useProject((t) => t.timelineSetWidth);
  const selected = useProject((t) => t.selected);
  const copy = useProject((t) => t.copyComp);
  const width = useProject((t) => t.timelineWidth);
  const deleteComp = useProject((t) => t.deleteComp);
  const fps = useProject((t) => t.project.template.fps);
  const playerRef = useProject((t) => t.playerRef);
  const isPlaying = useProject((t) => t.playerIsPlaying);
  const frame = useProject((t) => t.playerFrame);

  return (
    <div className="flex justify-between py-1 px-2 border-b border-base-300">
      <div className="flex space-x-2">
        <Button
          Icon={IoIosTrash}
          disabled={!selected}
          onClick={() => deleteComp()}
          tooltip="Delete"
        />
        <Button
          Icon={IoIosCopy}
          disabled={!selected}
          onClick={() => copy()}
          tooltip="Ctrl + C"
        />
      </div>
      <div className="flex items-center justify-center space-x-5">
        <Button
          Icon={playerRef?.isMuted ? IoIosVolumeOff : IoIosVolumeHigh}
          onClick={() =>
            playerRef?.isMuted() ? playerRef?.unmute() : playerRef?.mute()
          }
          tooltip="M"
        />
        <Button
          Icon={IoIosSkipBackward}
          onClick={() => playerRef?.seekTo(frame - 5 * fps)}
          tooltip="← / J"
        />
        <Button
          Icon={isPlaying ? IoIosPause : IoIosPlay}
          onClick={() => (isPlaying ? playerRef?.pause() : playerRef?.play())}
          tooltip="⎵"
        />
        <Button
          Icon={IoIosSkipForward}
          onClick={() => playerRef?.seekTo(frame + 5 * fps)}
          tooltip="→ / L"
        />
        <Button
          Icon={IoMdExpand}
          onClick={() => playerRef?.requestFullscreen()}
          tooltip="F"
        />
      </div>
      <div className="text-xl flex items-center space-x-2">
        <Button Icon={IoIosRemove} onClick={() => setWidth(width / 1.1)} />
        <Button Icon={IoIosAdd} onClick={() => setWidth(width * 1.1)} />
      </div>
    </div>
  );
};

export const TimelineBar = ({
  duration,
  fps,
}: {
  duration: number;
  fps: number;
}) => {
  const frame = useProject((s) => s.playerFrame);
  const playerRef = useProject((s) => s.playerRef);
  return (
    <div className="h-14 w-full relative p-3 pr-7">
      <div className="relative">
        {new Array(duration * 2 + 1).fill(0).map((_, i) =>
          i % Math.ceil(duration / 10) !== 0 ? null : (
            <div
              key={i}
              className="absolute top-0 flex flex-col -translate-x-1/2 items-center"
              style={{
                left: `${(i / 2 / duration) * 100}%`,
              }}
            >
              <div
                className={"h-3 bg-base-content"}
                style={{ width: i % 2 === 0 ? 2 : 1 }}
              />
              <p className="text-sm">{i % 2 === 0 && Math.floor(i / 2)}</p>
            </div>
          )
        )}
        <input
          id="timeline"
          type="range"
          value={frame}
          onChange={(e) => {
            playerRef?.seekTo(Number(e.currentTarget.value));
          }}
          step={1}
          min={0}
          max={duration * fps}
          className="absolute top-0 left-0 w-full h-6 timeline"
        />
      </div>
    </div>
  );
};
