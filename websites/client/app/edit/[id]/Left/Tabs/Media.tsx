import { FileUploadButton } from "../../../../../components/FileUploadButton";
import { MediaTab } from "../../../../../components/MediaTab";
import { getRandomId } from "../../../../../helpers";
import { useFiles } from "../../../../../hooks/useFiles";
import { useProject } from "../../../../../hooks/useProject";
import { trpc } from "../../../../ClientProvider";

export default function Media() {
  const setTab = useProject((t) => t.leftSetTab);
  const mediaType = useFiles((t) => t.mediaType);
  const addComp = useProject((s) => s.addComp);
  const { data: media } = trpc.media.getAll.useQuery({ type: mediaType });

  const add = (src: string) => {
    addComp({
      id: getRandomId(),
      comp: mediaType.toLowerCase() as any,
      src,
      objectFit: "cover",
    });
  };

  return (
    <div className="flex flex-col w-full justify-between h-full">
      <div>
        <MediaTab />
        <div className="grid grid-cols-3 gap-2">
          {media?.files.map((file, i) => (
            <div key={i} onClick={() => add(file.url)} className="w-full">
              {(file.type === "IMAGE" || file.type === "GIF") && (
                <img src={file.url} className="aspect-square object-cover" />
              )}
              {file.type === "VIDEO" && (
                <video src={file.url} className="aspect-square object-cover" />
              )}
              <p className="text-[12px] whitespace-nowrap overflow-hidden">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <FileUploadButton onChange={() => {}} />
        <button onClick={() => setTab("stock")} className="btn btn-sm">
          Use stock media
        </button>
      </div>
    </div>
  );
}
