import {
  TranscriptionAnimationTypes,
  TranscriptionProps,
} from "@asius/components";
import { useState } from "react";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "../../../../../components/inputs";
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
            value={JSON.stringify(comp.src, null, 2)}
            onChange={(src) => setComp({ ...comp, src: JSON.parse(src) })}
          />
        ) : (
          <div className="col-span-2 w-full space-y-2">
            {comp.src.map(({ text, end, start }, i) => (
              <div key={i} className="grid grid-cols-4 w-full gap-2">
                <TextInput
                  label="T"
                  value={text}
                  onChange={(text) =>
                    setComp({
                      ...comp,
                      src: comp.src.map((w, j) =>
                        i === j ? { ...w, text } : w
                      ),
                    })
                  }
                />
                <NumberInput
                  label="S"
                  value={start}
                  onChange={(start) =>
                    setComp({
                      ...comp,
                      src: comp.src.map((w, j) =>
                        i === j ? { ...w, start: start || 0 } : w
                      ),
                    })
                  }
                />
                <NumberInput
                  label="E"
                  value={end}
                  onChange={(end) =>
                    setComp({
                      ...comp,
                      src: comp.src.map((w, j) =>
                        i === j ? { ...w, end: end || 0 } : w
                      ),
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
      <BooleanInput
        label="Scroll by page"
        value={comp.scrollByPage}
        onChange={(scrollByPage) => setComp({ ...comp, scrollByPage })}
      />
      <EditSection title="Animation" level={1} className="col-span-2">
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
          setStyle={(animationStyle) =>
            setComp({
              ...comp,
              animationStyle,
            })
          }
          style={comp.animationStyle}
        />
      </EditSection>
    </EditSection>
  );
};
