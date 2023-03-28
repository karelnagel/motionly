import axios from "axios";
import { useRef, useState } from "react";
import { trpc } from "../providers/TRPCProvider";
import { useAlerts } from "../components/Alert";

export const useFileUpload = (onChange?: (url: string) => void) => {
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
      onChange?.(blobUrl);

      const { id, signedUrl } = await getSignedUrl({
        name: file.name,
        type: file.type,
      });
      await axios.put(signedUrl, file);
      const userFile = await verify({ id });
      if (!userFile) return alert("Error uploading file", "error");
      onChange?.(userFile.url);
      setFile(undefined);
      if (ref.current) ref.current.value = "";
      alert("File uploaded", "info");
    } catch (e) {
      alert("Error uploading file", "error");
      console.log(e);
    }
  };
  return { uploadFile, ref, file, setFile };
};
