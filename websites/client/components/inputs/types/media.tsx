import { useState } from "react";
import { trpc } from "../../../app/ClientProvider";
import { MediaType } from "../../../types";
import { InputProps } from "..";
import { Popup } from "../../Popup";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { getMediaUrl } from "../../../helpers/getMediaUrl";

export const MediaInput = ({ value, onChange, type }: InputProps<string>) => {
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
          type={type.toUpperCase() as MediaType}
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
  value?: string;
  onChange: (val?: string) => void;
  type: MediaType;
  hide: () => void;
}) => {
  const { data: media } = trpc.media.getAll.useQuery({
    type,
  });
  const { uploadFile, file, setFile, ref } = useFileUpload();
  const { mutate: youtube, isLoading } = trpc.media.youtube.useMutation();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  return (
    <Popup hide={hide}>
      {type !== "VIDEO" ? (
        <img src={value} alt="selected" className="w-60 h-60 object-contain" />
      ) : (
        <video src={value} className="w-60 h-60 object-contain" controls />
      )}

      <div>
        <p className="text-xl font-semibold mt-4">Select from existing</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-auto">
          {media?.files.length ? (
            media.files.map((file) => {
              const fileUrl = getMediaUrl(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => onChange(fileUrl)}
                  className=" w-20 bg-base-300 flex flex-col items-center m-2  whitespace-nowrap text-sm overflow-hidden cursor-pointer relative"
                >
                  {type !== "VIDEO" ? (
                    <img src={fileUrl} className=" h-20 object-contain" />
                  ) : (
                    <video
                      src={fileUrl}
                      className=" h-20"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                      muted
                    />
                  )}
                  {value?.includes(fileUrl) && (
                    <p className="absolute font-bold bg-base-200 h-full w-full flex items-center justify-center bg-opacity-50">
                      Selected
                    </p>
                  )}
                  <p>{file.name}</p>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <p className="text-xl font-semibold">Add file</p>
        <div className="grid grid-cols-4">
          {type === "VIDEO" && (
            <>
              <input
                type="text"
                className="input input-bordered input-sm w-full col-span-3"
                value={youtubeUrl}
                placeholder="Youtube URL"
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <button
                className="btn btn-primary"
                disabled={!youtubeUrl || isLoading}
                onClick={() => {
                  setYoutubeUrl("");
                  youtube({ youtubeUrl });
                }}
              >
                Use
              </button>
            </>
          )}
          <input
            ref={ref}
            type="file"
            accept="image/*, video/*, audio/*"
            className="file-input file-input-sm col-span-3"
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
      </div>
    </Popup>
  );
};
