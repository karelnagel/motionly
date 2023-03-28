import { OneRender } from "../../../../../../components/OneRender";
import { useProject } from "../../../../../../hooks/useProject";
import { trpc } from "../../../../../../providers/TRPCProvider";

export default function Export() {
  const frame = useProject((s) => s.playerFrame);
  const id = useProject((s) => s.project.id);
  const template = useProject((s) => s.project.template);
  const { data: renders } = trpc.renders.getAll.useQuery({ projectId: id }, { refetchInterval: 3000 });
  const { mutate: renderStill, isLoading: stillLoading } = trpc.renders.still.useMutation();
  const { mutate: renderMedia, isLoading: mediaLoading } = trpc.renders.media.useMutation();

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div>
        <p className="font-semibold my-2">Render</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-sm" disabled={stillLoading} onClick={() => renderStill({ template, frame, id })}>
            Current frame
          </button>

          <button disabled={mediaLoading} className="btn btn-sm btn-primary" onClick={() => renderMedia({ template, id })}>
            video
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <p className="font-semibold mb-2">History</p>
        <div className="space-y-3 flex flex-col">
          {renders?.renders?.map((render) => (
            <OneRender render={render} key={render.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
