import { useState } from "react";
import { trpc } from "../../../app/ClientProvider";
import { MediaType } from "../../../types";
import { FileUploadButton } from "../../FileUploadButton";
import { InputProps } from "..";
import { Popup } from "../../Popup";

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
          type={type as MediaType}
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
  const { data: media } = trpc.media.getAll.useQuery({});

  return (
    <Popup hide={hide}>
      {type !== "VIDEO" ? (
        <img src={value} alt="selected" className="w-60 h-60 object-contain" />
      ) : (
        <video src={value} className="w-60 h-60 object-contain" controls />
      )}

      <div>
        <p className="text-xl font-semibold">Upload new file</p>
        <FileUploadButton onChange={onChange} />
        <p className="text-xl font-semibold mt-4">Select from existing</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-60 overflow-auto">
          {media?.files.length ? (
            media.files.map((file) => (
              <div
                key={file.url}
                onClick={() => onChange(file.url!)}
                className=" w-20 bg-base-300 flex flex-col items-center m-2  whitespace-nowrap text-sm overflow-hidden cursor-pointer relative"
              >
                {type !== "VIDEO" ? (
                  <img src={file.url} className=" h-20 object-contain" />
                ) : (
                  <video src={file.url} className=" h-20" />
                )}
                {value?.includes(file.url!) && (
                  <p className="absolute font-bold bg-base-200 h-full w-full flex items-center justify-center bg-opacity-50">
                    Selected
                  </p>
                )}
                <p>{file.name}</p>
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
