import { ProgressbarProps, ProgressbarTypes } from "@motionly/base";
import {
  BooleanInput,
  ColorInput,
  NumberInput,
  SelectInput,
} from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditProgressbar = ({
  comp,
  setComp,
}: {
  comp: ProgressbarProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Progressbar">
      <ColorInput
        label="Color"
        value={comp.color}
        onChange={(color) => setComp({ ...comp, color })}
      />
      <ColorInput
        label="Background"
        value={comp.bg}
        onChange={(bg) => setComp({ ...comp, bg })}
      />
      <SelectInput
        label="Type"
        value={comp.type}
        onChange={(type) =>
          setComp({
            ...comp,
            type: type as keyof typeof ProgressbarTypes,
          })
        }
        options={Object.entries(ProgressbarTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      {comp.type === "square" && (
        <>
          <NumberInput
            label="Bar Width (px)"
            value={comp.barWidth}
            onChange={(barWidth) => setComp({ ...comp, barWidth })}
          />
          <BooleanInput
            label="Top right corner"
            value={comp.topRight}
            onChange={(topRight) => setComp({ ...comp, topRight })}
          />
        </>
      )}
      {comp.type === "circle" && (
        <>
          <NumberInput
            label="Bar Width (px)"
            value={comp.barWidth}
            onChange={(barWidth) => setComp({ ...comp, barWidth })}
          />
        </>
      )}
    </EditSection>
  );
};
