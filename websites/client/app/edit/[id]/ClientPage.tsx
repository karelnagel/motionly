"use client";

import { useRef } from "react";
import { TemplateContext } from "../../../components/TemplateContext";
import { Header } from "./Header";
import { Timeline } from "./Timeline/Timeline";
import { PlayerRef } from "@remotion/player";
import { HotKeys } from "../../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
import { SidePanel } from "./SidePanel/SidePanel";
import { TimelineDiv } from "./Timeline/TimelineDiv";
import { Template } from "../../../types";
import Link from "next/link";
import { useTemplate } from "../../../hooks/useTemplate";

export function ClientPageWrapper({
  template: startTemplate,
}: {
  template: Template;
}) {
  return (
    <TemplateContext startTemplate={startTemplate}>
      <ClientPage />
    </TemplateContext>
  );
}
export function ClientPage() {
  const playerRef = useRef<PlayerRef>(null);
  const { template } = useTemplate();
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden">
      <div className="flex md:hidden flex-col items-center justify-center h-full space-y-3">
        <p>The editor is not meant to be used on a phone!</p>
        <Link href={`/templates/${template.id}`} className="btn btn-primary">
          Template page
        </Link>
      </div>
      <div className="flex-col hidden md:flex">
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
    </div>
  );
}
