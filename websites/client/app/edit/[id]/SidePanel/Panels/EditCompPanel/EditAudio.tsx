import { AudioProps } from "@motionly/base";
import { NumberInput } from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
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
      <Media
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
        type="video"
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
