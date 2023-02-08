"use client";

import { Timeline } from "./Timeline/Timeline";
import { HotKeys } from "../../../components/HotKeys";
import { PlayerDiv } from "./Player/PlayerDiv";
import { RightPanel } from "./Right/RightPanel";
import { TimelineDiv } from "./Timeline/TimelineDiv";
import { Project } from "../../../types";
import Link from "next/link";
import { ProjectProvider, useProject } from "../../../hooks/useProject";
import { LeftBar } from "./Left/LeftBar";
import { LeftPanel } from "./Left/LeftPanel";
import { RightBar } from "./Right/RightBar";
import { useState } from "react";
import { useEffect } from "react";
import { Loading } from "../../../components/Loading";

export function ClientPageWrapper({ project }: { project: Project }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <ProjectProvider project={project}>
      {isClient && <ClientPage />}
      {!isClient && <Loading />}
    </ProjectProvider>
  );
}
export function ClientPage() {
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
            <PlayerDiv />
            <RightPanel />
          </div>
          <TimelineDiv>
            <Timeline />
          </TimelineDiv>
        </div>
        <RightBar />
      </div>
      <HotKeys />
    </div>
  );
}
