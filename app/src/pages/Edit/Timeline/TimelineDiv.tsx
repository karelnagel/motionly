import { ReactNode } from "react";
import { Resize } from "../../../components/Resize";
import { useTimelineStore } from "../../../store";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const height = useTimelineStore((t) => t.heigth);
  const setHeight = useTimelineStore((t) => t.setHeight);
  return (
    <div style={{ height: height }} className=" shrink-0 bg-base-100 shadow-md flex flex-col relative">
      {children}
      <Resize value={height} setValue={setHeight} isHorizontal />
    </div>
  );
};
