import { ImageProps, ObjectFit } from "@asius/components";
import { SelectInput, TextInput } from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditImage = ({
  comp,
  setComp,
}: {
  comp: ImageProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Image">
      <TextInput
        label="Src"
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
      />
      <SelectInput
        label="Fit"
        value={comp.objectFit}
        onChange={(objectFit) =>
          setComp({ ...comp, objectFit: objectFit as keyof typeof ObjectFit })
        }
        options={Object.entries(ObjectFit).map(([value, label]) => ({
          value,
          label,
        }))}
      />
    </EditSection>
  );
};
