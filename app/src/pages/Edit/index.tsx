// import { LeftBar } from "./Left/LeftBar";
// import { LeftPanel } from "./Left/LeftPanel";
import { Player } from "./Player";
// import { RightBar } from "./Right/RightBar";
// import { RightPanel } from "./Right/RightPanel";
import { Timeline } from "./Timeline/Timeline";
import { TimelineDiv } from "./Timeline/TimelineDiv";

export const edit = () => {
  return (
    <div>
      {/* <LeftBar /> */}
      <div>
        <div>
          {/* <LeftPanel /> */}
          <Player />
          {/* <RightPanel /> */}
        </div>
        <TimelineDiv>
          <Timeline />
        </TimelineDiv>
      </div>
      {/* <RightBar /> */}
    </div>
  );
};
