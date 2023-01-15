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
  const frame = useCurrentPlayerFrame(playerRef);
  const [width, setWidth] = useLocalStorage("timelineWidth", 100);
  return (
    <div className="overflow-x-auto h-full relative">
      <div
        className="h-full w-full flex flex-col"
        style={{ width: `${width}%` }}
      >
        <div className="h-14 w-full relative p-3 pr-7">
          <div className=" relative ">
            {new Array(template.duration * 2 + 1).fill(0).map((_, i) =>
              i % Math.ceil(template.duration / 10) !== 0 ? null : (
                <div
                  key={i}
                  className="absolute top-0 flex flex-col -translate-x-1/2 items-center"
                  style={{
                    left: `${(i / 2 / template.duration) * 100}%`,
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
              max={template.duration * template.fps}
              className="absolute top-0 left-0 w-full h-6 timeline"
            />
          </div>
        </div>
        <div className="overflow-y-scroll h-full overflow-x-hidden px-3 pb-2">
          <div className="flex flex-col space-y-2">
            {template.comps.map((comp, i) => (
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
      <div className="fixed bottom-2 left-2 p-2 py-1 leading-none text-3xl space-x-6 bg-primary text-primary-content flex items-center rounded-lg">
        <button
          disabled={width / 1.1 < 100}
          onClick={() => setWidth((w) => (w / 1.1 > 100 ? w / 1.1 : 100))}
        >
          -
        </button>
        <button onClick={() => setWidth((w) => w * 1.1)}>+</button>
      </div>
    </div>
  );
};