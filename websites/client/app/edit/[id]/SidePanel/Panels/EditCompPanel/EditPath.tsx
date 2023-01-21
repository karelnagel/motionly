import { PathProps } from "@asius/base";
import {
  BooleanInput,
  ColorInput,
  NumberInput,
  TextInput,
} from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditPath = ({
  comp,
  setComp,
}: {
  comp: PathProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Path">
      <TextInput
        label="Path"
        value={comp.path}
        onChange={(path) => setComp({ ...comp, path })}
      />
      <ColorInput
        label="Stroke"
        value={comp.strokeColor}
        onChange={(strokeColor) => setComp({ ...comp, strokeColor })}
      />
      {comp.strokeColor && (
        <NumberInput
          label="Stroke width (px)"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
      <ColorInput
        label="Fill"
        value={comp.fillColor}
        onChange={(fillColor) => setComp({ ...comp, fillColor })}
      />
      <NumberInput
        label="Viewbox X (px)"
        value={comp.viewBoxX}
        onChange={(viewBoxX) => setComp({ ...comp, viewBoxX })}
      />
      <NumberInput
        label="Viewbox Y (px)"
        value={comp.viewBoxY}
        onChange={(viewBoxY) => setComp({ ...comp, viewBoxY })}
      />
      <NumberInput
        label="Viewbox Width (px)"
        value={comp.viewBoxWidth}
        onChange={(viewBoxWidth) => setComp({ ...comp, viewBoxWidth })}
      />
      <NumberInput
        label="Viewbox Height (px)"
        value={comp.viewBoxHeight}
        onChange={(viewBoxHeight) => setComp({ ...comp, viewBoxHeight })}
      />
      <BooleanInput
        label="Rounded (px)"
        value={comp.isRound}
        onChange={(isRound) => setComp({ ...comp, isRound })}
      />
      {/* <p className="col-span-2">Animation</p>
      <NumberInput
        label="Duration"
        value={comp.animation.duration}
        onChange={(duration) =>
          setComp({
            ...comp,
            animation: { ...comp.animation, duration },
          })
        }
      />
      <NumberInput
        label="Form"
        value={comp.animation.from}
        onChange={(from) =>
          setComp({ ...comp, animation: { ...comp.animation, from } })
        }
      />
      <NumberInput
        label="To"
        value={comp.animation.to}
        onChange={(to) =>
          setComp({ ...comp, animation: { ...comp.animation, to } })
        }
      /> */}
    </EditSection>
  );
};
