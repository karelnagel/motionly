"use client";

import { Player } from "@motionly/player";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoIosBrush, IoIosCopy } from "react-icons/io";
import { Clone } from "../../../../components/Clone";
import { Input } from "../../../../components/inputs";
import { Project } from "../../../../types";
import produce from "immer";
import { TemplateType } from "@motionly/base";
import { trpc, trpcClient } from "../../../ClientProvider";

export const Client = ({ startProject }: { startProject: Project }) => {
  const [project, setProject] = useState(startProject);
  const { data: session } = useSession();
  const template = project.template as TemplateType;
  // const { mutateAsync: renderMedia } = trpc.render.media.useMutation({});
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="space-y-3 flex flex-col items-stretch ">
        <div className="flex justify-between">
          <p className="text-3xl font-bold col-span-4">{project.name}</p>
          <div className="space-x-1 hidden md:flex">
            {project.isOwner && (
              <Link
                href={`/edit/${project.id}`}
                className="btn btn-square btn-sm"
              >
                <IoIosBrush className="" />
              </Link>
            )}
            {session?.user && (
              <Clone project={project} className="btn btn-square btn-sm">
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
        {template.inputs?.allIds.map((inputId) => {
          const input = template.inputs?.byIds[inputId];
          if (!input) return null;
          return (
            <Input
              key={inputId}
              label={input.label || ""}
              onChange={(i) => {
                setProject(
                  produce((draft) => {
                    const input = draft.template.inputs?.byIds[inputId];
                    if (!input) return;
                    input.value = i;
                  })
                );
              }}
              value={input.value}
              type={input.type || "text"}
            />
          );
        })}
        {/* <div className="flex flex-col  space-y-2 justify-between">
          {status && <p>Status: {status}</p>}
          {status && (
            <progress
              value={progress}
              max={1}
              className="progress w-full progress-primary"
            />
          )}
          <button
            className="btn btn-primary"
            disabled={status === "rendering"}
            onClick={media}
          >
            Render
          </button>
          {fileUrl && (
            <Link target="_blank" className="btn btn-outline" href={fileUrl}>
              FILE
            </Link>
          )}
        </div> */}
      </div>
      <Player
        loop
        template={template}
        allowFullscreen
        clickToPlay
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
};
