import { AudioProps } from "@asius/components";
import { NumberInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditAudio = ({
  comp,
  setComp,
}: {
  comp: AudioProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Audio">
      <TextInput
        label="url"
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
      />
      <NumberInput
        label="volume"
        value={comp.volume}
        onChange={(volume) => setComp({ ...comp, volume })}
      />
      <NumberInput
        label="start"
        value={comp.startFrom}
        onChange={(startFrom) => setComp({ ...comp, startFrom })}
      />
    </EditSection>
  );
};
