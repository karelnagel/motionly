import axios from "axios";
import { useState } from "react";

export const Media = ({
  value,
  onChange,
  type,
}: {
  value: string;
  onChange: (val: string) => void;
  type: "image" | "video";
}) => {
  const [file, setFile] = useState<File>();

  const uploadFile = async () => {
    if (!file) return;
    const response = await axios.post("/api/media/signed-url", {
      name: file.name,
      type: file.type,
    });
    const { url, key } = response.data;
    await axios.put(url, file);
    onChange(`https://asius-media.s3.amazonaws.com/${key}`);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={uploadFile}>UPLOAD</button>
    </div>
  );
};
