import { LottieProps } from "@asius/components";
import {
  BooleanInput,
  ColorInput,
  NumberInput,
  TextInput,
} from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditLottie = ({
  comp,
  setComp,
}: {
  comp: LottieProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Lottie">
      <TextInput
        label="Src"
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
      />
      <BooleanInput
        label="Backwards"
        value={comp.backwards}
        onChange={(backwards) => setComp({ ...comp, backwards })}
      />
      <BooleanInput
        label="Loop"
        value={comp.loop}
        onChange={(loop) => setComp({ ...comp, loop })}
      />
      <NumberInput
        label="Playback Speed"
        value={comp.playbackRate}
        onChange={(playbackRate) => setComp({ ...comp, playbackRate })}
      />

      <ColorInput
        label="Background"
        value={comp.bg}
        onChange={(bg) => setComp({ ...comp, bg })}
      />
    </EditSection>
  );
};
