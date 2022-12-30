import { PathCompProps, StrokeLinecap } from "@asius/types";
import { ColorInput, NumberInput, SelectInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditPath = ({ comp, setComp }: { comp: PathCompProps; setComp: SetComp }) => {
  return (
    <EditSection title="Path">
      <TextInput label="Path" value={comp.path} onChange={(path) => setComp({ ...comp, path })} />
      <ColorInput
        label="Stroke color"
        value={comp.strokeColor}
        onChange={(strokeColor) => setComp({ ...comp, strokeColor })}
      />
      <NumberInput
        label="Stroke width"
        value={comp.strokeWidth}
        onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
      />
      <ColorInput
        label="Fill color"
        value={comp.fillColor}
        onChange={(fillColor) => setComp({ ...comp, fillColor })}
      />
      <p className="col-span-2">View box</p>
      <NumberInput
        label="height"
        value={comp.viewBoxHeight}
        onChange={(viewBoxHeight) => setComp({ ...comp, viewBoxHeight })}
      />
      <NumberInput
        label="width"
        value={comp.viewBoxWidth}
        onChange={(viewBoxWidth) => setComp({ ...comp, viewBoxWidth })}
      />
      <SelectInput
        label="Linecap"
        value={comp.strokeLinecap}
        onChange={(strokeLinecap) => setComp({ ...comp, strokeLinecap: strokeLinecap as any })}
        options={Object.entries(StrokeLinecap).map(([value, label]) => ({ value, label }))}
      />
      <p className="col-span-2">Animation</p>
      <NumberInput
        label="Duration"
        value={comp.animation.duration}
        onChange={(duration) => setComp({ ...comp, animation: { ...comp.animation, duration } })}
      />
      <NumberInput
        label="Form"
        value={comp.animation.from}
        onChange={(from) => setComp({ ...comp, animation: { ...comp.animation, from } })}
      />
      <NumberInput
        label="To"
        value={comp.animation.to}
        onChange={(to) => setComp({ ...comp, animation: { ...comp.animation, to } })}
      />
    </EditSection>
  );
};
