import {
  TranscriptionAnimationTypes,
  TranscriptionProps,
  TranscriptionWord,
} from "@motionly/base";
import { useEffect } from "react";
import { useState } from "react";
import { useAlerts } from "../../../../../../components/Alert";
import { Input } from "../../../../../../components/inputs";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { Popup } from "../../../../../../components/Popup";
import { ShowJson } from "../../../../../../components/ShowJson";
import { useComponent, useStore } from "../../../../../../hooks/useStore";
import { getMediaUrl } from "../../../../../../helpers";
import { getMedia } from "../../../../../../sdk/media/get";
import { getTranscription } from "../../../../../../sdk/media/getTranscription";
import { startTranscription } from "../../../../../../sdk/media/startTranscription";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "textStyle",
    type: "style",
  },
  {
    prop: "startFrom",
    type: "number",
  },
  {
    prop: "scrollByPage",
    type: "checkbox",
  },
  {
    prop: "animationType",
    type: "select",
    options: Object.entries(TranscriptionAnimationTypes).map(
      ([value, label]) => ({
        value,
        label,
      })
    ),
  },
  {
    prop: "animationStyle",
    type: "style",
  },
];
export const EditTranscription = () => {
  const comp = useComponent() as TranscriptionProps;
  const setComp = useStore((t) => t.setComp);

  return (
    <EditSection title="Transcription">
      <GetTranscriptions onChange={(src) => setComp({ ...comp, src })} />
      <ShowJson
        label="Words"
        json={JSON.stringify(comp.src, null, 2)}
        onChange={(json) =>
          setComp({ ...comp, src: json ? JSON.parse(json) : comp.src })
        }
      >
        <div className="col-span-2 w-full space-y-2">
          {comp.src.map((word, i) => (
            <Word
              key={i}
              word={word}
              setWord={(n) =>
                setComp({
                  ...comp,
                  src: comp.src.map((w, j) => (i === j ? { ...w, ...n } : w)),
                })
              }
            />
          ))}
        </div>
      </ShowJson>
      <Inputs inputs={inputs} />
    </EditSection>
  );
};

const Word = ({
  word: { text, start, end },
  setWord,
}: {
  word: TranscriptionWord;
  setWord: (w: Partial<TranscriptionWord>) => void;
}) => {
  return (
    <div className="grid grid-cols-4 w-full gap-2">
      <Input
        type="text"
        label="T"
        value={text}
        onChange={(text) => setWord({ text })}
      />
      <Input
        type="number"
        label="S"
        value={start}
        onChange={(start) => setWord({ start })}
      />
      <Input
        type="number"
        label="E"
        value={end}
        onChange={(end) => setWord({ end })}
      />
    </div>
  );
};

export const GetTranscriptions = ({
  onChange,
}: {
  onChange: (e: TranscriptionWord[]) => void;
}) => {
  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState<string[]>();
  const [selected, setSelected] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [transcription, setTranscription] = useState<TranscriptionWord[]>();
  const alert = useAlerts();
  useEffect(() => {
    if (!show) return;
    getMedia("video").then((res) => {
      if (res) setVideos(res);
    });
  }, [show]);

  const getTrans = async (video: string) => {
    setStatus(undefined);
    setTranscription(undefined);
    setSelected(video);
    const res = await getTranscription(video);
    if (!res) {
      setStatus(undefined);
      return;
    }
    setTranscription(res.transcription);
    setStatus(res.status);
  };
  const transcribe = async (video: string) => {
    if (!video) return;
    const res = await startTranscription(video, getMediaUrl(video));
    if (!res) return alert("Error starting transcription", "error");
    getTrans(video);
    alert("Transcription started", "info");
  };
  return (
    <div className=" col-span-2 text-center">
      <button onClick={() => setShow(true)} className="btn btn-sm">
        Get Transcriptions from a video
      </button>
      {show && (
        <Popup hide={() => setShow(false)}>
          <p>Select video to transcribe</p>
          <div className="grid grid-cols-5 gap-3 max-h-80 overflow-auto">
            {videos?.map((v) => (
              <div
                key={v}
                onClick={() => getTrans(v)}
                className="w-24 flex flex-col items-center overflow-hidden cursor-pointer"
              >
                <video src={getMediaUrl(v)} className=" h-24" />
                <p>{v?.split("/")?.pop()}</p>
              </div>
            ))}
          </div>
          {selected && (
            <div>
              <p>Selected: {selected?.split("/")?.pop()}</p>
              <p>Transcription status: {status || "NONE"}</p>
              {(!status || status === "FAILED") && (
                <button
                  className="btn btn-sm"
                  onClick={() => transcribe(selected)}
                >
                  Transcribe
                </button>
              )}
              {transcription && (
                <button
                  onClick={() => {
                    onChange(transcription);
                    setShow(false);
                  }}
                  className="btn btn-sm"
                >
                  Use Transcription
                </button>
              )}
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};
