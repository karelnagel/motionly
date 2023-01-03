import {
  ProgressbarProps,
  ProgressbarSquareCorners,
  ProgressbarTypes,
} from "@asius/components";
import {
  ColorInput,
  NumberInput,
  SelectInput,
} from "../../../../../components/inputs";
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
        value={comp.background}
        onChange={(background) => setComp({ ...comp, background })}
      />
      <SelectInput
        label="Type"
        value={comp.progressBarType}
        onChange={(progressBarType) =>
          setComp({
            ...comp,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            progressBarType: progressBarType as any,
          })
        }
        options={Object.entries(ProgressbarTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      {comp.progressBarType === "square" && (
        <>
          <NumberInput
            label="Width"
            value={comp.barWidth}
            onChange={(barWidth) => setComp({ ...comp, barWidth })}
          />
          <SelectInput
            label="Corner"
            value={comp.corner}
            onChange={(corner) =>
              setComp({
                ...comp,
                corner: corner as keyof typeof ProgressbarSquareCorners,
              })
            }
            options={Object.entries(ProgressbarSquareCorners).map(
              ([value, label]) => ({
                value,
                label,
              })
            )}
          />
        </>
      )}
      {comp.progressBarType === "circle" && (
        <>
          <NumberInput
            label="Width"
            value={comp.barWidth}
            onChange={(barWidth) => setComp({ ...comp, barWidth })}
          />
        </>
      )}
    </EditSection>
  );
};
