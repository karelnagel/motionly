import {
  TranscriptionAnimationTypes,
  TranscriptionCompProps,
  TranscriptionScrollType,
} from "@asius/types";
import { useState } from "react";
import { NumberInput, SelectInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { EditTextStyle } from "./EditTextStyle";
import { SetComp } from "./index";

export const EditTranscription = ({
  comp,
  setComp,
}: {
  comp: TranscriptionCompProps;
  setComp: SetComp;
}) => {
  const [showJson, setShowJson] = useState(false);
  return (
    <EditSection title="Transcription">
      <EditSection title="Words" level={1} className="col-span-2" hideByDefault>
        <button
          className="col-span-2 bg-primary text-primary-content w-full p-2 rounded-lg"
          onClick={() => setShowJson(!showJson)}
        >
          {showJson ? "Hide json" : "Show json"}
        </button>
        {showJson ? (
          <TextInput
            area
            label="Json"
            value={JSON.stringify(comp.words, null, 2)}
            onChange={(words) => setComp({ ...comp, words: JSON.parse(words) })}
          />
        ) : (
          <div className="col-span-2 w-full space-y-2">
            {comp.words.map(({ text, end, start }, i) => (
              <div key={i} className="grid grid-cols-4 w-full gap-2">
                <TextInput
                  label="T"
                  value={text}
                  onChange={(text) =>
                    setComp({
                      ...comp,
                      words: comp.words.map((w, j) => (i === j ? { ...w, text } : w)),
                    })
                  }
                />
                <NumberInput
                  label="S"
                  value={start}
                  onChange={(start) =>
                    setComp({
                      ...comp,
                      words: comp.words.map((w, j) => (i === j ? { ...w, start } : w)),
                    })
                  }
                />
                <NumberInput
                  label="E"
                  value={end}
                  onChange={(end) =>
                    setComp({
                      ...comp,
                      words: comp.words.map((w, j) => (i === j ? { ...w, end } : w)),
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </EditSection>
      <EditTextStyle
        setStyle={(textStyle) => setComp({ ...comp, textStyle })}
        style={comp.textStyle}
      />
      <SelectInput
        label="Scroll type"
        value={comp.scrollType}
        onChange={(scrollType) => setComp({ ...comp, scrollType: scrollType as any })}
        options={Object.entries(TranscriptionScrollType).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <EditSection title="Animation" level={1} className="col-span-2">
        <SelectInput
          label="Type"
          value={comp.animation.type}
          onChange={(type) =>
            setComp({ ...comp, animation: { ...comp.animation, type: type as any } })
          }
          options={Object.entries(TranscriptionAnimationTypes).map(([value, label]) => ({
            value,
            label,
          }))}
        />
        <EditTextStyle
          setStyle={(textStyle) =>
            setComp({ ...comp, animation: { ...comp.animation, textStyle } })
          }
          style={comp.animation.textStyle}
        />
      </EditSection>
    </EditSection>
  );
};
