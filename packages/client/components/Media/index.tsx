import { getMedia, uploadMedia } from "@asius/sdk";
import { useEffect, useRef, useState } from "react";
import { getMediaUrl } from "../../helpers";
import { useAlerts } from "../Alert";
import { Popup } from "../Popup";

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
        {value?.split("/")?.pop()}
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
  const alert = useAlerts();
  const uploadFile = async () => {
    if (!file) return;
    const key = await uploadMedia(file);
    if (!key) return alert("Error uploading file", "error");
    onChange(getMediaUrl(key));
    setFile(undefined);
    if (ref.current) ref.current.value = "";
    alert("File uploaded", "info");
  };

  const getFiles = async () => {
    const files = await getMedia(type);
    if (!files) return alert("Error getting files", "error");
    setFiles(files);
  };

  useEffect(() => {
    getFiles();
  }, [file]);

  return (
    <Popup hide={hide}>
      {type !== "video" ? (
        <img src={value} alt="selected" className="w-60 h-60 object-contain" />
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
                className=" w-20  bg-base-300 flex flex-col items-center m-2  whitespace-nowrap text-sm overflow-hidden cursor-pointer relative"
              >
                {type !== "video" ? (
                  <img
                    src={getMediaUrl(file)}
                    className=" h-20 object-contain"
                  />
                ) : (
                  <video src={getMediaUrl(file)} className=" h-20" />
                )}
                {value.includes(file) && (
                  <p className="absolute font-bold bg-base-200 h-full w-full flex items-center justify-center bg-opacity-50">
                    Selected
                  </p>
                )}
                <p>{file?.split("/")?.pop()}</p>
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
    </Popup>
  );
};
