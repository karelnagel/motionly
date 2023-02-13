import { useRef, useState } from "react";
import { useFiles } from "../hooks/useFiles";
import { useAlerts } from "./Alert";

export const FileUploadButton = ({
  onChange,
}: {
  onChange: (url: string) => void;
}) => {
  const [file, setFile] = useState<File>();
  const upload = useFiles((s) => s.upload);
  const alert = useAlerts((s) => s.addAlert);
  const ref = useRef<HTMLInputElement>(null);

  const uploadFile = async () => {
    if (!file) return;
    const userFile = await upload(file, (f) => onChange(f.url));
    if (!userFile) return alert("Error uploading file", "error");
    setFile(undefined);
    if (ref.current) ref.current.value = "";
    alert("File uploaded", "info");
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
