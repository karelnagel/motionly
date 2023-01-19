import {
  TranscriptionAnimationTypes,
  TranscriptionProps,
  TranscriptionWord,
} from "@asius/components";
import { getMedia, getTranscription, startTranscription } from "@asius/sdk";
import { useEffect } from "react";
import { useState } from "react";
import { useAlerts } from "../../../../../../components/Alert";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "../../../../../../components/inputs";
import { Popup } from "../../../../../../components/Popup";
import { ShowJson } from "../../../../../../components/ShowJson";
import { getMediaUrl } from "../../../../../../helpers";
import { EditSection } from "./EditSection";
import { EditTextStyle } from "./EditTextStyle";
import { SetComp } from "./index";

export const EditTranscription = ({
  comp,
  setComp,
}: {
  comp: TranscriptionProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Transcription">
      <GetTranscriptions onChange={(src) => setComp({ ...comp, src })} />
      <ShowJson
        label="Words"
        json={JSON.stringify(comp.src, null, 2)}
        onChange={(json) => setComp({ ...comp, src: JSON.parse(json) })}
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

      <EditTextStyle
        setStyle={(textStyle) => setComp({ ...comp, textStyle })}
        style={comp.textStyle}
      />
      <p className="col-span-2 text-lg mt-2 font-semibold">Animation</p>
      <BooleanInput
        label="Scroll by page"
        className="col-span-2"
        value={comp.scrollByPage}
        onChange={(scrollByPage) => setComp({ ...comp, scrollByPage })}
      />
      <NumberInput
        label="start"
        value={comp.startFrom}
        onChange={(startFrom) => setComp({ ...comp, startFrom })}
      />
      <SelectInput
        label="Type"
        value={comp.animationType}
        onChange={(animationType) =>
          setComp({
            ...comp,
            animationType:
              animationType as keyof typeof TranscriptionAnimationTypes,
          })
        }
        options={Object.entries(TranscriptionAnimationTypes).map(
          ([value, label]) => ({
            value,
            label,
          })
        )}
      />
      <EditTextStyle
        label="Animation style"
        setStyle={(animationStyle) =>
          setComp({
            ...comp,
            animationStyle,
          })
        }
        style={comp.animationStyle}
      />
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
      <TextInput
        label="T"
        value={text}
        onChange={(text) => setWord({ text })}
      />
      <NumberInput
        label="S"
        value={start}
        onChange={(start) => setWord({ start })}
      />
      <NumberInput label="E" value={end} onChange={(end) => setWord({ end })} />
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
