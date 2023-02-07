"use client";

import { useRef } from "react";
import { Timeline } from "./Timeline/Timeline";
import { PlayerRef } from "@remotion/player";
import { HotKeys } from "../../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
import { SidePanel } from "./Right/RightPanel";
import { TimelineDiv } from "./Timeline/TimelineDiv";
import { Project } from "../../../types";
import Link from "next/link";
import { ProjectProvider, useProject } from "../../../hooks/useProject";
import { LeftBar } from "./Left/LeftBar";
import { LeftPanel } from "./Left/LeftPanel";
import { RightBar } from "./Right/RightBar";

export function ClientPageWrapper({ project }: { project: Project }) {
  return (
    <ProjectProvider project={project}>
      <ClientPage />
    </ProjectProvider>
  );
}
export function ClientPage() {
  const playerRef = useRef<PlayerRef>(null);
  const id = useProject((t) => t.project.id);
  return (
    <div className="bg-base-300 w-screen h-screen overflow-hidden">
      <div className="flex md:hidden flex-col items-center justify-center h-full space-y-3">
        <p>The editor is not meant to be used on a phone!</p>
        <Link href={`/templates/${id}`} className="btn btn-primary">
          Project page
        </Link>
      </div>
      <div className="hidden md:flex h-screen w-screen ">
        <LeftBar />
        <div className="flex flex-col w-full">
          <div className="flex h-full">
            <LeftPanel />
            <PlayerDiv playerRef={playerRef} />
            <SidePanel />
          </div>
          <TimelineDiv>
            <Timeline playerRef={playerRef} />
          </TimelineDiv>
        </div>
        <RightBar />
      </div>
      <HotKeys playerRef={playerRef} />
    </div>
  );
}
