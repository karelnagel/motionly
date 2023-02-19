import axios from "axios";
import { useRef, useState } from "react";
import { trpc } from "../app/ClientProvider";
import { useAlerts } from "./Alert";

export const FileUploadButton = ({
  onChange,
}: {
  onChange: (url: string) => void;
}) => {
  const [file, setFile] = useState<File>();
  const alert = useAlerts((s) => s.addAlert);
  const ref = useRef<HTMLInputElement>(null);
  const { mutateAsync: getSignedUrl } = trpc.media.new.useMutation();
  const { mutateAsync: verify } = trpc.media.verify.useMutation();

  const uploadFile = async () => {
    try {
      if (!file) return;
      alert("Uploading file");
      const blobUrl = URL.createObjectURL(file);
      onChange(blobUrl);

      const { id, signedUrl } = await getSignedUrl({
        name: file.name,
        type: file.type,
      });
      await axios.put(signedUrl, file);
      const userFile = await verify({ id });
      if (!userFile) return alert("Error uploading file", "error");
      onChange(userFile.url);
      setFile(undefined);
      if (ref.current) ref.current.value = "";
      alert("File uploaded", "info");
    } catch (e) {
      alert("Error uploading file", "error");
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center">
      <input
        ref={ref}
        type="file"
        accept="image/*, video/*, audio/*"
        className="file-input file-input-sm"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button
        disabled={!file}
        className="btn btn-sm btn-primary"
        onClick={uploadFile}
      >
        UPLOAD
      </button>
    </div>
  );
};
