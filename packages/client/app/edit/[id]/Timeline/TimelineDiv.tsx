import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export const TimelineDiv = ({ children }: { children: ReactNode }) => {
  const [timelineHeigth, setTimelineHeight] = useLocalStorage("timeline1", 250);

  return (
    <div className="p-3 pt-0 shrink-0">
      <div style={{ height: timelineHeigth }} className="panel relative">
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
