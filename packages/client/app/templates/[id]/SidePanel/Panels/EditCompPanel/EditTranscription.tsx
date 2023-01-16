import {
  TranscriptionAnimationTypes,
  TranscriptionProps,
  TranscriptionWord,
} from "@asius/components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
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
  const [media, setMedia] = useState<string>("");

  useEffect(() => {
    if (!media) return;
    const key = media.replace(getMediaUrl(""), "");
    axios
      .get("/api/transcribe", { params: { key } })
      .then((res) => setComp({ ...comp, src: res.data }));
  }, [media]);

  return (
    <EditSection title="Transcription">
      <Media type="video" value={media} onChange={(e) => setMedia(e)} />
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
