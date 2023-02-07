import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useTimeline } from "../../../../hooks/useProject/timelineSlice";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const height = useTimeline((t) => t.height);
  const setHeight = useTimeline((t) => t.setHeight);
  return (
    <div
      style={{ height: height }}
      className=" shrink-0 bg-base-100 border-t border-base-300 flex flex-col relative"
    >
      {children}
      <Resize value={height} setValue={setHeight} isHorizontal />
    </div>
  );
};
