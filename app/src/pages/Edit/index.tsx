// import { LeftBar } from "./Left/LeftBar";
// import { LeftPanel } from "./Left/LeftPanel";
import { HotKeys } from "../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
// import { RightBar } from "./Right/RightBar";
// import { RightPanel } from "./Right/RightPanel";
import { Timeline } from "./Timeline/Timeline";
import { TimelineDiv } from "./Timeline/TimelineDiv";

export const edit = () => {
  return (
    <div className="h-screen">
      {/* <LeftBar /> */}
      <div className="h-screen flex flex-col">
        <div className="h-full">
          {/* <LeftPanel /> */}
          <PlayerDiv />
          {/* <RightPanel /> */}
        </div>
        <TimelineDiv>
          <Timeline />
        </TimelineDiv>
      </div>
      {/* <RightBar /> */}
      <HotKeys />
    </div>
  );
};
