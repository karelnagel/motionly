"use client";

import { useEffect, useRef } from "react";
import { Timeline } from "./Timeline/Timeline";
import { PlayerRef } from "@remotion/player";
import { HotKeys } from "../../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
import { SidePanel } from "./Right/SidePanel";
import { TimelineDiv } from "./Timeline/TimelineDiv";
import { Project } from "../../../types";
import Link from "next/link";
import { useStore } from "../../../hooks/useStore";
import { LeftBar } from "./Left/LeftBar";
import { LeftPanel } from "./Left/LeftPanel";

export function ClientPageWrapper({ project }: { project: Project }) {
  const init = useStore((s) => s.init);
  useEffect(() => init(project), []);
  return <ClientPage />;
}
export function ClientPage() {
  const playerRef = useRef<PlayerRef>(null);
  const id = useStore((t) => t.project.id);
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden">
      <div className="flex md:hidden flex-col items-center justify-center h-full space-y-3">
        <p>The editor is not meant to be used on a phone!</p>
        <Link href={`/templates/${id}`} className="btn btn-primary">
          Project page
        </Link>
      </div>
      <div className="flex- hidden md:flex h-screen ">
        <LeftBar />
        <div className="flex flex-col">
          <div className=" w-full flex h-full">
            <LeftPanel />
            <PlayerDiv playerRef={playerRef} />
            <SidePanel />
          </div>
          <TimelineDiv>
            <Timeline playerRef={playerRef} />
          </TimelineDiv>
          <HotKeys playerRef={playerRef} />
        </div>
        <div className="w-10 bg-red-500"></div>
      </div>
    </div>
  );
}
