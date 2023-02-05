import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const [timelineHeigth, setTimelineHeight] = useLocalStorage("timeline1", 250);

  return (
    <div className=" shrink-0 bg-base-100 border-t border-base-300">
      <div style={{ height: timelineHeigth }} className=" relative">
        {children}
        <Resize
          value={timelineHeigth}
          setValue={setTimelineHeight}
          isHorizontal
        />
      </div>
    </div>
  );
};
