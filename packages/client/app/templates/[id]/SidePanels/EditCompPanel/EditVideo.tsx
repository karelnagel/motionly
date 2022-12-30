import { ObjectFit, VideoCompProps } from "@asius/types";
import { BooleanInput, NumberInput, SelectInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditVideo = ({ comp, setComp }: { comp: VideoCompProps; setComp: SetComp }) => {
  return (
    <EditSection title="Video">
      <TextInput label="Src" value={comp.src} onChange={(src) => setComp({ ...comp, src })} />
      <SelectInput
        label="Fit"
        value={comp.objectFit}
        onChange={(objectFit) => setComp({ ...comp, objectFit: objectFit as any })}
        options={Object.entries(ObjectFit).map(([value, label]) => ({ value, label }))}
      />
      <NumberInput
        label="Start From"
        value={comp.startFrom}
        onChange={(startFrom) => setComp({ ...comp, startFrom })}
      />
      <BooleanInput
        label="Muted"
        value={comp.muted}
        onChange={(muted) => setComp({ ...comp, muted })}
      />
      <NumberInput
        label="Volume"
        value={comp.volume}
        onChange={(volume) => setComp({ ...comp, volume })}
      />
      <BooleanInput
        label="Offthread"
        value={comp.offthread}
        onChange={(offthread) => setComp({ ...comp, offthread })}
      />
    </EditSection>
  );
};