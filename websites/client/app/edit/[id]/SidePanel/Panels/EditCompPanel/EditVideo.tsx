import { ObjectFit, VideoProps } from "@motionly/base";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
} from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditVideo = ({
  comp,
  setComp,
}: {
  comp: VideoProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Video">
      <Media
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
        type="video"
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
      <NumberInput
        label="Start From (s)"
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
