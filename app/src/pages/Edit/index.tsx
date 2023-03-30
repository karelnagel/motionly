import { HotKeys } from "../../components/HotKeys";
import { LeftPanel, LeftTabs } from "./Left";
import { PlayerDiv } from "./Player/PlayerDiv";
import { RightPanel, RightTabs } from "./Right";
import { Timeline } from "./Timeline/Timeline";
import { TimelineDiv } from "./Timeline/TimelineDiv";

export const edit = () => {
  return (
    <div className="h-screen w-screen flex bg-base-300 overflow-hidden">
      <LeftTabs />
      <div className="h-screen flex flex-col w-full">
        <div className="h-full flex max-w-full ">
          <LeftPanel />
          <PlayerDiv />
          <RightPanel />
        </div>
        <TimelineDiv>
          <Timeline />
        </TimelineDiv>
      </div>
      <RightTabs />
      <HotKeys />
    </div>
  );
};
