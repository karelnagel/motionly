import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "path",
    type: "text",
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
    prop: "viewBoxX",
    type: "number",
  },
  {
    prop: "viewBoxY",
    type: "number",
  },
  {
    prop: "viewBoxWidth",
    type: "number",
  },
  {
    prop: "viewBoxHeight",
    type: "number",
  },
  {
    prop: "isRound",
    type: "checkbox",
  },
];

export const EditPath = () => {
  return (
    <EditSection title="Path">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
