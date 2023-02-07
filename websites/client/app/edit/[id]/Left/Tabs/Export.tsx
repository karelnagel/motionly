import Link from "next/link";
import { useCallback } from "react";
import { IoImage } from "react-icons/io5";
import { MdOutlineMovieCreation } from "react-icons/md";
import { useProject } from "../../../../../hooks/useProject";

export default function Export() {
  const allRenders = useProject((s) => s.allRenders);
  const status = useProject((s) => s.status);
  const template = useProject((s) => s.project.template);
  const renderMedia = useProject((s) => s.renderMedia);
  const renderStill = useProject((s) => s.renderStill);

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div>
        <p className="font-semibold my-2">Render</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="btn btn-sm"
            onClick={() => renderStill(template)}
            disabled={status === "rendering"}
          >
            Current frame
          </button>

          <button
            disabled={status === "rendering"}
            className="btn btn-sm btn-primary"
            onClick={() => renderMedia(template)}
          >
            video
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <p className="font-semibold mb-2">History</p>
        <div className="space-y-3 flex flex-col">
          {allRenders
            .slice(0)
            .reverse()
            .map((id: string) => (
              <Render id={id} key={id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export const Render = ({ id }: { id: string }) => {
  const render = useProject(useCallback((s) => s.renders[id], [id]));
  if (!render) return null;
  return (
    <div
      className={`flex flex-col  rounded-lg ${
        render.status === "error"
          ? "bg-error text-error-content"
          : "bg-base-100"
      }`}
    >
      <div className="flex items-center p-2 space-x-2 justify-between">
        <div className="flex space-x-2">
          <div className="text-xl">
            {render.type === "still" ? <IoImage /> : <MdOutlineMovieCreation />}
          </div>
          <p className="text-sm">
            {new Date(render.startTime).toLocaleString()}
          </p>
        </div>

        {render.fileUrl && (
          <Link
            href={render.fileUrl}
            target="_blank"
            className="uppercase font-semibold text-sm"
          >
            Open
          </Link>
        )}
      </div>
      <progress
        value={render.progress}
        max={1}
        className={`progress ${
          render.status === "error"
            ? "progress-primary"
            : render.status === "done"
            ? "progress-success"
            : "progress-primary"
        }`}
      />
    </div>
  );
};
