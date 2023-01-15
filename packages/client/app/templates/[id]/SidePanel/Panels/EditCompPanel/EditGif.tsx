import { GifProps, ObjectFit } from "@asius/components";
import { SelectInput } from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGif = ({
  comp,
  setComp,
}: {
  comp: GifProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Gif">
      <Media
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
        type="gif"
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
