import { CompProps } from "@asius/types";
import { NumberInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGeneral = ({ comp, setComp }: { comp: CompProps; setComp: SetComp }) => {
  return (
    <EditSection title="General">
      <NumberInput label="X" value={comp.x} onChange={(x) => setComp({ ...comp, x })} />
      <NumberInput label="Y" value={comp.y} onChange={(y) => setComp({ ...comp, y })} />
      <NumberInput label="W" value={comp.width} onChange={(width) => setComp({ ...comp, width })} />
      <NumberInput
        label="H"
        value={comp.height}
        onChange={(height) => setComp({ ...comp, height })}
      />
      <NumberInput
        label="RAD"
        value={comp.borderRadius}
        onChange={(borderRadius) => setComp({ ...comp, borderRadius })}
      />
      <NumberInput
        label="ROT"
        value={comp.rotation}
        onChange={(rotation) => setComp({ ...comp, rotation })}
      />
      <NumberInput label="FROM" value={comp.from} onChange={(from) => setComp({ ...comp, from })} />
      <NumberInput
        label="DUR"
        value={comp.duration}
        onChange={(duration) => setComp({ ...comp, duration })}
      />
    </EditSection>
  );
};
