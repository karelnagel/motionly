import { usePlayerRef, usePlayerStore, useTemplate } from "../../../store/index";
import { Component } from "./Component";
import { TopBar } from "./TopBar";

export const Timeline = () => {
  const allComponents = useTemplate((t) => t.allComponents);
  return (
    <div id="timeline" className="flex flex-col h-full">
      <TopBar />
      <div className="relative h-full w-full">
        <Playhead />
        <div className="absolute w-full h-full overflow-auto space-y-1 py-1">
          {allComponents.map((c) => (
            <Component key={c} id={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Playhead = () => {
  const { duration, fps } = useTemplate((t) => ({ duration: t.duration, fps: t.fps }));
  const frame = usePlayerStore((s) => s.frame);
  const playerRef = usePlayerRef();
  return (
    <input
      type="range"
      id="playhead"
      value={frame}
      onChange={(e) => {
        playerRef?.seekTo(Number(e.currentTarget.value));
      }}
      step={1}
      min={0}
      max={duration * fps}
    />
  );
};
