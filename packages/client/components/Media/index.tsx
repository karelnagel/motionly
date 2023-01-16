import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { getMediaUrl } from "../../helpers";

export const Media = ({
  value,
  onChange,
  type,
}: {
  value: string;
  onChange: (val: string) => void;
  type: "image" | "video" | "gif";
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="col-span-2 text-sm grid grid-cols-3 gap-3 items-center">
      <p className="col-span-2 text-ellipsis overflow-hidden whitespace-nowrap">
        {value.split("/").reverse()[0]}
      </p>
      <button onClick={() => setShow((s) => !s)} className="btn btn-sm">
        Change
      </button>
      {show && (
        <MediaPopup
          value={value}
          onChange={onChange}
          type={type}
          hide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export const MediaPopup = ({
  value,
  onChange,
  type,
  hide,
}: {
  value: string;
  onChange: (val: string) => void;
  type: "image" | "video" | "gif";
  hide: () => void;
}) => {
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<string[]>();
  const ref = useRef<HTMLInputElement>(null);

  const uploadFile = async () => {
    if (!file) return;
    const response = await axios.post("/api/media/signed-url", {
      name: file.name,
      type: file.type,
    });
    const { url, key } = response.data;
    await axios.put(url, file);
    if (type === "video") {
      const res = await axios.post("/api/transcribe", {
        url: getMediaUrl(key),
        key,
      });
      console.log(res.data);
    }
    onChange(getMediaUrl(key));
    setFile(undefined);
    if (ref.current) ref.current.value = "";
  };

  const getFiles = async () => {
    const response = await axios.get("/api/media");
    const files = response.data.filter((f: string) => {
      const file = f.toLowerCase();
      if (type === "video")
        return (
          file.includes(".mp4") ||
          file.includes(".mkv") ||
          file.includes(".mp3")
        );
      if (type === "gif") return file.includes(".gif");
      else
        return (
          file.includes(".png") ||
          file.includes(".jpg") ||
          file.includes(".jpeg") ||
          file.includes(".svg")
        );
    });
    setFiles(files);
  };

  useEffect(() => {
    getFiles();
  }, [file]);

  return (
    <div
      onClick={() => hide()}
      className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-40 z-[3000]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-base-300 rounded-lg p-10 flex space-x-3 items-center relative"
      >
        <IoIosClose
          onClick={hide}
          className="absolute top-3 right-3 text-4xl cursor-pointer"
        />
        {type !== "video" ? (
          <img
            src={value}
            alt="selected"
            className="w-60 h-60 object-contain"
          />
        ) : (
          <video src={value} className="w-60 h-60 object-contain" controls />
        )}
        <div>
          <p className="text-xl font-semibold">Upload new file</p>
          <div className="flex items-center">
            <input
              ref={ref}
              type="file"
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
          <p className="text-xl font-semibold mt-4">Select from existing</p>
          <div className="grid grid-cols-5 gap-2 max-h-60 overflow-auto">
            {files ? (
              files.map((file) => (
                <div
                  key={file}
                  onClick={() => onChange(getMediaUrl(file))}
                  className="w-20 h-20 bg-base-300 rounded-lg m-2 flex items-center justify-center cursor-pointer relative"
                >
                  {type !== "video" ? (
                    <img
                      src={getMediaUrl(file)}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video src={getMediaUrl(file)} className="w-full h-full" />
                  )}
                  {value.includes(file) && (
                    <p className="absolute font-bold bg-base-200 h-full w-full flex items-center justify-center bg-opacity-50">
                      Selected
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <p className="text-xl font-semibold mt-4">From url</p>
          <input
            type="text"
            className="input w-full"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};
