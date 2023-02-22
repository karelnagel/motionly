import { useState } from "react";
import { trpc } from "../../../app/ClientProvider";
import { InputProps } from "..";
import { Popup } from "../../Popup";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { getMediaUrl, getTransUrl } from "../../../helpers/getMediaUrl";
import { MediaTypes } from "@motionly/base";

export const MediaInput = ({ value, onChange, type }: InputProps<string>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="col-span-2 text-sm grid grid-cols-3 gap-3 items-center">
      <button onClick={() => setShow((s) => !s)} className="btn btn-sm w-full">
        Change
      </button>
      {show && (
        <MediaPopup
          value={value}
          onChange={onChange}
          type={type.toUpperCase() as MediaTypes}
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
  type: MediaTypes;
  hide: () => void;
}) => {
  const { data: media } = trpc.media.getAll.useQuery({
    type: type === "TRANSCRIPTION" ? "VIDEO" : type,
  });

  const { uploadFile, file, setFile, ref } = useFileUpload();
  const { mutate: youtube, isLoading } = trpc.media.youtube.useMutation();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const selected = media?.files.find((f) => value?.includes(f.id));
  const isTrans = type === "TRANSCRIPTION";
  return (
    <Popup hide={hide}>
      <p>{selected?.name}</p>
      {type === "IMAGE" || type === "GIF" ? (
        <img src={value} alt="selected" className="w-60 h-60 object-contain" />
      ) : !isTrans ? (
        <video src={value} className="w-60 h-60 object-contain" controls />
      ) : (
        <Trans id={selected?.id} />
      )}

      <div>
        <p className="text-xl font-semibold mt-4">Select from existing</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-auto">
          {media?.files.length ? (
            media.files.map((file) => {
              const fileUrl = getMediaUrl(file.id);
              const transUrl = getTransUrl(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => onChange(isTrans ? transUrl : fileUrl)}
                  className="w-20 bg-base-300 flex flex-col items-center m-2  whitespace-nowrap text-sm overflow-hidden cursor-pointer relative"
                >
                  {type === "IMAGE" || type === "GIF" ? (
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
                  {selected?.id === file.id && (
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
          {(type === "VIDEO" || type === "TRANSCRIPTION") && (
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
const Trans = ({ id }: { id?: string }) => {
  if (!id) return null;
  const { data } = trpc.media.get.useQuery({ id }, { refetchInterval: 4000 });
  const {
    mutate: transcribe,
    isError,
    isLoading,
  } = trpc.transcriptions.transcribe.useMutation();
  return (
    <>
      {isError && <p className="text-error">Error starting transcribing</p>}
      {data?.transcription && (
        <div className="w-full">
          <p>Status: {data.transcription.status}</p>
          <p>Language: {data.transcription.language}</p>
          <p>Persons: {data.transcription.persons}</p>
          <textarea
            className="textarea texatarea-bordered input-sm w-full min-h-[200px] leading-none"
            value={JSON.stringify(data.transcription.transcript, null, 2)}
            onChange={() => {}}
          />
        </div>
      )}
      {!data?.transcription && (
        <div>
          <p>Not transcribed yet!</p>
          <button
            className="btn btn-primary"
            onClick={() => transcribe({ fileId: id })}
            disabled={isLoading}
          >
            Transcribe
          </button>
        </div>
      )}
    </>
  );
};
