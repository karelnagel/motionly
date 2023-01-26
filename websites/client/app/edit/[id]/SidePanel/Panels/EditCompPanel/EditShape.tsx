import {
  AudioProps,
  ShapeProps,
  ShapeTypes,
  TriangleDirection,
} from "@motionly/base";
import {
  ColorInput,
  NumberInput,
  SelectInput,
} from "../../../../../../components/inputs";
import { Media } from "../../../../../../components/Media";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditShape = ({
  comp,
  setComp,
}: {
  comp: ShapeProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Audio">
      <SelectInput
        label="Type"
        value={comp.type}
        onChange={(type) =>
          setComp({ ...comp, type: type as keyof typeof ShapeTypes })
        }
        options={Object.entries(ShapeTypes).map(([value, label]) => ({
          label,
          value,
        }))}
      />
      <ColorInput
        label="Fill"
        onChange={(fill) => setComp({ ...comp, fill })}
        value={comp.fill}
      />
      <ColorInput
        label="Stroke"
        onChange={(stroke) => setComp({ ...comp, stroke })}
        value={comp.stroke}
      />
      {comp.stroke && (
        <NumberInput
          label="Stroke Width (px)"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
      {(comp.type === "triangle" || comp.type === "rect") && (
        <>
          <NumberInput
            label="Corner Radius"
            
            value={comp.cornerRadius}
            onChange={(cornerRadius) => setComp({ ...comp, cornerRadius })}
          />
          <NumberInput
            label="Edge Roundness"
            value={comp.edgeRoundness}
            onChange={(edgeRoundness) => setComp({ ...comp, edgeRoundness })}
          />
        </>
      )}
      {comp.type === "triangle" && (
        <>
          <SelectInput
            label="Direction"
            value={comp.direction}
            onChange={(direction) =>
              setComp({
                ...comp,
                direction: direction as keyof typeof TriangleDirection,
              })
            }
            options={Object.entries(TriangleDirection).map(
              ([value, label]) => ({
                label,
                value,
              })
            )}
          />
        </>
      )}
    </EditSection>
  );
};
