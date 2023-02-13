import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useProject } from "../../../../hooks/useProject";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const height = useProject((t) => t.timelineHeight);
  const setHeight = useProject((t) => t.timelineSetHeight);
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
