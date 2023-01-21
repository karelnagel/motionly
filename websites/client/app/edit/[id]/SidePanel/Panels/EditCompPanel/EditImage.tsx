import { ImageProps, ObjectFit } from "@asius/base";
import { SelectInput } from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
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
      <Media
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
        type="image"
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
