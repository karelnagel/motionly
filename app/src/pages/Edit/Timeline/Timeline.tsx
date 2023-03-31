import { useTemplateStore, useTemplate, useTimelineStore, usePlayerStore, usePlayerRef } from "../../../store/index";
import { TimelineComponent } from "./TimelineComp";
import { TopBar } from "./TopBar";

export const Timeline = () => {
  const allComponents = useTemplateStore((s) => s.templates[s.template || ""].allComponents);
  const width = useTimelineStore((t) => t.width);

  return (
    <div className=" h-full relative flex flex-col">
      <TopBar />
      <div className=" w-full h-full overflow-x-auto">
        <div className="h-full w-full flex flex-col" style={{ width: `${width}%` }}>
          <TimelineBar />
          <div className="overflow-y-scroll h-full overflow-x-hidden px-3 pb-2">
            <div className="flex flex-col space-y-2 relative">
              {allComponents?.map((id) => (
                <TimelineComponent key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimelineBar = () => {
  const { duration, fps } = useTemplate();
  const frame = usePlayerStore((s) => s.frame);
  const playerRef = usePlayerRef();
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
              <div className={"h-3 bg-base-content"} style={{ width: i % 2 === 0 ? 2 : 1 }} />
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
