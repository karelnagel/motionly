import { LottieProps, LottieDirections } from "@asius/components";
import {
  BooleanInput,
  ColorInput,
  NumberInput,
  SelectInput,
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
      <SelectInput
        label="Direction"
        value={comp.direction}
        onChange={(direction) =>
          setComp({
            ...comp,
            direction: direction as keyof typeof LottieDirections,
          })
        }
        options={Object.entries(LottieDirections).map(([value, label]) => ({
          label,
          value,
        }))}
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
        value={comp.background}
        onChange={(background) => setComp({ ...comp, background })}
      />
    </EditSection>
  );
};
