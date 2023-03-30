import { ReactNode } from "react";
import { Resize } from "../../../components/Resize";
import { useStore } from "../../../store";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const height = useStore((t) => t.timelineHeight);
  const setHeight = useStore((t) => t.timelineSetHeight);
  return (
    <div style={{ height: height }} className=" shrink-0 bg-base-100 shadow-md flex flex-col relative">
      {children}
      <Resize value={height} setValue={setHeight} isHorizontal />
    </div>
  );
};
