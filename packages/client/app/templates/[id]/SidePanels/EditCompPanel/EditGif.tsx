import { GifCompProps, ObjectFit } from "@asius/types";
import { SelectInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGif = ({ comp, setComp }: { comp: GifCompProps; setComp: SetComp }) => {
  return (
    <EditSection title="Gif">
      <TextInput label="Src" value={comp.src} onChange={(src) => setComp({ ...comp, src })} />
      <SelectInput
        label="Fit"
        value={comp.objectFit}
        onChange={(objectFit) => setComp({ ...comp, objectFit: objectFit as any })}
        options={Object.entries(ObjectFit).map(([value, label]) => ({ value, label }))}
      />
    </EditSection>
  );
};
