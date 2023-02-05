import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "src",
    type: "text",
  },
  {
    prop: "lat",
    type: "number",
  },
  {
    prop: "lng",
    type: "number",
  },
  {
    prop: "zoom",
    type: "number",
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
    prop: "fill",
    type: "color",
  },
  {
    prop: "bg",
    type: "color",
  },
  {
    prop: "markerColor",
    type: "color",
  },
  {
    prop: "markerSize",
    type: "number",
    if: (comp) => comp.markerColor,
  },
];

export const EditMap = () => {
  return (
    <EditSection title="Map">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
