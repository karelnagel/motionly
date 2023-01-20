import { ComponentProps } from "@asius/components";
import { NumberInput } from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGeneral = ({
  comp,
  setComp,
}: {
  comp: ComponentProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection>
      <NumberInput
        label="X (px)"
        placeholder="0"
        value={comp.x}
        onChange={(x) => setComp({ ...comp, x })}
      />
      <NumberInput
        label="Y (px)"
        placeholder="0"
        value={comp.y}
        onChange={(y) => setComp({ ...comp, y })}
      />
      <NumberInput
        label="Width (px)"
        placeholder="MAX"
        value={comp.width}
        onChange={(width) => setComp({ ...comp, width })}
      />
      <NumberInput
        label="Height (px)"
        placeholder="MAX"
        value={comp.height}
        onChange={(height) => setComp({ ...comp, height })}
      />
      <NumberInput
        label="Border Radius (px)"
        value={comp.borderRadius}
        placeholder="0"
        onChange={(borderRadius) => setComp({ ...comp, borderRadius })}
      />
      <NumberInput
        label="Rotation (deg)"
        placeholder="0"
        value={comp.rotation}
        onChange={(rotation) => setComp({ ...comp, rotation })}
      />
      <NumberInput
        label="From (s)"
        tooltip
        placeholder="0"
        value={comp.from}
        onChange={(from) => setComp({ ...comp, from })}
      />
      <NumberInput
        label="Duration (s)"
        tooltip
        placeholder="MAX"
        value={comp.duration}
        onChange={(duration) => setComp({ ...comp, duration })}
      />
    </EditSection>
  );
};
