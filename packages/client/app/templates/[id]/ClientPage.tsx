"use client";

import { useRef } from "react";
import { TemplateType } from "@asius/components";
import { TemplateContext } from "../../../components/TemplateContext";
import { Header } from "./Header";
import { Timeline } from "./Timeline/Timeline";
import { PlayerRef } from "@remotion/player";
import { HotKeys } from "../../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
import { SidePanel } from "./SidePanel/SidePanel";
import { TimelineDiv } from "./Timeline/TimelineDiv";

export function ClientPageWrapper({
  template: startTemplate,
}: {
  template: TemplateType;
}) {
  return (
    <TemplateContext startTemplate={startTemplate}>
      <ClientPage />
    </TemplateContext>
  );
}
export function ClientPage() {
  const playerRef = useRef<PlayerRef>(null);
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <div className=" w-full flex h-full">
        <PlayerDiv playerRef={playerRef} />
        <SidePanel />
      </div>
      <TimelineDiv>
        <Timeline playerRef={playerRef} />
      </TimelineDiv>
      <HotKeys playerRef={playerRef} />
    </div>
  );
}
