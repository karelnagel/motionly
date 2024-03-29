"use client";

import { Player } from "@motionly/player";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoIosBrush, IoIosCopy, IoIosImages } from "react-icons/io";
import { Clone } from "../../../../../components/Clone";
import { Input } from "../../../../../components/inputs";
import { Project } from "../../../../../types";
import produce from "immer";
import { trpc } from "../../../../ClientProvider";
import { OneRender } from "../../../../../components/OneRender";
import { ShowHide } from "../../../../../components/ShowHide";

export const Client = ({
  startProject,
  renderCount = 0,
  cloneCount = 0,
}: {
  startProject: Project;
  renderCount?: number;
  cloneCount?: number;
}) => {
  const [project, setProject] = useState(startProject);
  const { data: session } = useSession();
  const template = project.template;
  const {
    mutateAsync: render,
    isLoading,
    isError,
  } = trpc.renders.media.useMutation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="space-y-3 flex flex-col items-stretch ">
        <div className="flex justify-between">
          <p className="text-3xl font-bold col-span-4">{project.name}</p>
          <div className="space-x-1 hidden md:flex">
            {project.isOwner && (
              <Link href={`/edit/${project.id}`} className="btn btn-square">
                <IoIosBrush className="" />
              </Link>
            )}
            {session?.user && (
              <Clone project={project} className="btn btn-square">
                <IoIosCopy />
              </Clone>
            )}
          </div>
        </div>
        {project.public && (
          <span className="badge badge-primary font-bold">PUBLIC</span>
        )}
        <p className="text-lg">{project.description}</p>
        <p>
          <b>Duration:</b> {template.duration} seconds
        </p>
        <p>
          <b>Dimensions:</b> {template.width} x {template.height}
        </p>
        <div className="space-y-2">
          {template.variables?.allIds.map((variableId) => {
            const input = template.variables?.byIds[variableId];
            if (!input) return null;
            return (
              <div key={variableId}>
                <p>{input.label}</p>
                <Input
                  key={variableId}
                  label={input.label}
                  onChange={(i: any) => {
                    setProject(
                      produce((draft) => {
                        const input =
                          draft.template.variables?.byIds[variableId];
                        if (!input) return;
                        input.value = i;
                      })
                    );
                  }}
                  value={input.value}
                  type={input.type as any}
                />
              </div>
            );
          })}
        </div>
        {!session && (
          <Link
            href={`/login?redirect=/templates/${project.id}`}
            className="btn btn-warning w-full"
          >
            Login to render
          </Link>
        )}
        {session && (
          <div>
            <button
              disabled={isLoading}
              className="btn btn-primary w-full mt-4"
              onClick={() => render({ template, id: project.id })}
            >
              Render
            </button>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error with rendering</p>}
          </div>
        )}
        {session && <Renders projectId={project.id} />}
      </div>
      <div>
        <Player
          loop
          template={template}
          allowFullscreen
          clickToPlay
          controls
          style={{ width: "100%" }}
        />
        <div className="stats gradient text-primary-content shadow w-full rounded-t-none">
          <div className="stat border-primary-content ">
            <div className="stat-figure shrink-0">
              <IoIosImages className="text-3xl" />
            </div>
            <div className="stat-title">Renders</div>
            <div className="stat-value">{renderCount}</div>
          </div>
          <div className="stat border-primary-content ">
            <div className="stat-figure shrink-0">
              <IoIosCopy className="text-3xl" />
            </div>
            <div className="stat-title">Clones</div>
            <div className="stat-value">{cloneCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Renders = ({ projectId }: { projectId?: string }) => {
  const { data } = trpc.renders.getAll.useQuery(
    { projectId },
    { refetchInterval: 3000 }
  );
  const [show, setShow] = useState(true);
  return (
    <div className="space-y-2 bg-base-200 rounded-lg p-2">
      <div className="flex items-center justify-between">
        <p>Your latest renders</p>
        <ShowHide show={show} setShow={setShow} />
      </div>
      {show && (
        <div className="space-y-2">
          {data?.renders.map((render) => (
            <OneRender key={render.id} render={render} />
          ))}
        </div>
      )}
    </div>
  );
};
