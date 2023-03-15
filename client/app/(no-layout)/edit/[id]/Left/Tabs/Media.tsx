import { MediaTab } from "../../../../../../components/MediaTab";
import { getRandomId } from "../../../../../../helpers";
import { getMediaUrl } from "../../../../../../helpers/getMediaUrl";
import { useFiles } from "../../../../../../hooks/useFiles";
import { useProject } from "../../../../../../hooks/useProject";
import { useFileUpload } from "../../../../../../hooks/useFileUpload";
import { trpc } from "../../../../../../providers/TRPCProvider";

export default function Media() {
  const mediaType = useFiles((t) => t.mediaType);
  const addComp = useProject((s) => s.addComp);
  const { data: media } = trpc.media.getAll.useQuery({ type: mediaType });
  const { uploadFile, file, setFile, ref } = useFileUpload();
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
          {media?.files.map((file) => {
            const fileUrl = getMediaUrl(file.id);
            return (
              <div key={file.id} onClick={() => add(fileUrl)} className="w-full">
                {(file.type === "IMAGE" || file.type === "GIF") && <img src={fileUrl} className="aspect-square object-cover" />}
                {file.type === "VIDEO" && (
                  <video
                    src={fileUrl}
                    className="aspect-square object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    muted
                  />
                )}
                <p className="text-[12px] whitespace-nowrap overflow-hidden">{file.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <input
          ref={ref}
          type="file"
          accept="image/*, video/*, audio/*"
          className="file-input file-input-sm col-span-3"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button disabled={!file} className="btn btn-sm btn-primary" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </div>
  );
}
