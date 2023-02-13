import Link from "next/link";
import { IoImage } from "react-icons/io5";
import { MdOutlineMovieCreation } from "react-icons/md";
import { useProject } from "../../../../../hooks/useProject";
import { RenderProgress } from "../../../../../types";
import { trpc } from "../../../../ClientProvider";

export default function Export() {
  const frame = useProject((s) => s.playerFrame);
  const template = useProject((s) => s.project.template);
  const { data: renders } = trpc.renders.getAll.useQuery(
    {},
    { refetchInterval: 3000 }
  );
  const { mutate: renderStill, isLoading: stillLoading } =
    trpc.renders.still.useMutation();
  const { mutate: renderMedia, isLoading: mediaLoading } =
    trpc.renders.media.useMutation();

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div>
        <p className="font-semibold my-2">Render</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="btn btn-sm"
            disabled={stillLoading}
            onClick={() => renderStill({ template, frame })}
          >
            Current frame
          </button>

          <button
            disabled={mediaLoading}
            className="btn btn-sm btn-primary"
            onClick={() => renderMedia({ template })}
          >
            video
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <p className="font-semibold mb-2">History</p>
        <div className="space-y-3 flex flex-col">
          {renders?.renders?.map((render) => (
            <Render render={render} key={render.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Render = ({ render }: { render: RenderProgress }) => {
  if (!render) return null;
  return (
    <div
      className={`flex flex-col  rounded-lg ${
        render.status === "FAILED"
          ? "bg-error text-error-content"
          : "bg-base-100"
      }`}
    >
      <div className="flex items-center p-2 space-x-2 justify-between">
        <div className="flex space-x-2">
          <div className="text-xl">
            {render.type === "STILL" ? <IoImage /> : <MdOutlineMovieCreation />}
          </div>
          <p className="text-sm">{render.id}</p>
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
          render.status === "FAILED"
            ? "progress-primary"
            : render.status === "PROCESSING"
            ? "progress-success"
            : "progress-primary"
        }`}
      />
    </div>
  );
};
