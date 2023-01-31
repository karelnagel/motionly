"use client";

import { applyInputs } from "@motionly/base";
import { Player } from "@motionly/player";
import { useRender } from "@motionly/renderer/dist/sdk";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IoIosBrush, IoIosCopy } from "react-icons/io";
import { Clone } from "../../../../components/Clone";
import { Input } from "../../../../components/inputs";
import { Template } from "../../../../types";

export const Client = ({ startTemplate }: { startTemplate: Template }) => {
  const [templateState, setTemplate] = useState(startTemplate);
  const template = useMemo(() => applyInputs(templateState), [templateState]);
  const { data: session } = useSession();
  const { media, fileUrl, progress, status } = useRender(template);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="space-y-3 flex flex-col items-stretch ">
        <div className="flex justify-between">
          <p className="text-3xl font-bold col-span-4">{template.name}</p>
          <div className="space-x-1 hidden md:flex">
            {template.isOwner && (
              <Link
                href={`/edit/${template.id}`}
                className="btn btn-square btn-sm"
              >
                <IoIosBrush className="" />
              </Link>
            )}
            {session?.user && (
              <Clone template={template} className="btn btn-square btn-sm">
                <IoIosCopy />
              </Clone>
            )}
          </div>
        </div>
        {template.public && (
          <span className="badge badge-primary font-bold">PUBLIC</span>
        )}
        <p className="text-lg">{template.description}</p>
        <p>
          <b>Duration:</b> {template.duration} seconds
        </p>
        <p>
          <b>Dimensions:</b> {template.width} x {template.height}
        </p>
        {template.inputs?.map((input) => (
          <Input
            key={input.id}
            label={input.label || ""}
            onChange={(i) =>
              setTemplate({
                ...template,
                inputs: template.inputs?.map((inp) =>
                  inp.id === input.id ? { ...inp, value: i } : inp
                ),
              })
            }
            value={input.value}
            type={input.type || "text"}
          />
        ))}
        <div className="flex flex-col  space-y-2 justify-between">
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
        </div>
      </div>
      <Player
        width={template.width}
        height={template.height}
        fps={template.fps}
        comps={template.comps}
        background={template.background}
        duration={template.duration}
        allowFullscreen
        clickToPlay
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
};
