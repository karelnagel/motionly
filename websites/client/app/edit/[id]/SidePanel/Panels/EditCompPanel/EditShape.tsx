import { ShapeTypes, TriangleDirection } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "type",
    type: "select",
    options: Object.entries(ShapeTypes).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "fill",
    type: "color",
  },
  {
    prop: "stroke",
    type: "color",
  },
  {
    prop: "strokeWidth",
    type: "number",
    if: (comp) => comp.stroke,
  },
  {
    prop: "direction",
    type: "select",
    options: Object.entries(TriangleDirection).map(([value, label]) => ({
      value,
      label,
    })),
    if: (comp) => comp.type === "triangle",
  },
  {
    prop: "radius",
    type: "number",
    if: (comp) => comp.type === "circle",
  },
  {
    prop: "cornerRadius",
    type: "number",
    if: (comp) => comp.type === "triangle" || comp.type === "rect",
  },
  {
    prop: "edgeRoundness",
    type: "number",
    if: (comp) => comp.type === "triangle" || comp.type === "rect",
  },
];

export const EditShape = () => {
  return (
    <EditSection title="Audio">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
