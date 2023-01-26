import { PlayerRef } from "@remotion/player";
import { RefObject } from "react";
import { useTemplate } from "../../../../hooks/useTemplate";
import { useCurrentPlayerFrame } from "../../../../hooks/useCurrentPlayerFrame";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { TimelineComp } from "./TimelineComp";

export const Timeline = ({
  playerRef,
}: {
  playerRef: RefObject<PlayerRef>;
}) => {
  const { template } = useTemplate();
  const [width, setWidth] = useLocalStorage("timelineWidth", 100);
  return (
    <div className="overflow-x-auto h-full relative">
      <div
        className="h-full w-full flex flex-col"
        style={{ width: `${width}%` }}
      >
        <TimelineBar
          playerRef={playerRef}
          duration={template.duration}
          fps={template.fps}
        />
        <div className="overflow-y-scroll h-full overflow-x-hidden px-3 pb-2">
          <div className="flex flex-col space-y-2">
            {template.comps?.map((comp, i) => (
              <TimelineComp
                key={i}
                parentId=""
                comp={comp}
                comps={template.comps}
                parentDuration={template.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 leading-none text-xl text-primary-content flex flex-col items-center bg-base-300 space-y-1 p-1 rounded-bl-lg">
        <button onClick={() => setWidth((w) => w * 1.1)}>+</button>
        <button
          disabled={width / 1.1 < 100}
          onClick={() => setWidth((w) => (w / 1.1 > 100 ? w / 1.1 : 100))}
        >
          -
        </button>
      </div>
    </div>
  );
};

export const TimelineBar = ({
  playerRef,
  duration,
  fps,
}: {
  playerRef: RefObject<PlayerRef>;
  duration: number;
  fps: number;
}) => {
  const frame = useCurrentPlayerFrame(playerRef);

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
            playerRef.current?.seekTo(Number(e.currentTarget.value));
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
