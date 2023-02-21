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

export const Client = ({ startProject }: { startProject: Project }) => {
  const [project, setProject] = useState(startProject);
  const { data: session } = useSession();
  const template = project.template as TemplateType;

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
              <div>
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
