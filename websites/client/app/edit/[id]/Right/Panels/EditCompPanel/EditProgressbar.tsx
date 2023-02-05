import { ProgressbarTypes } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "color",
    type: "color",
  },
  {
    prop: "bg",
    type: "color",
  },
  {
    prop: "type",
    type: "select",
    options: Object.entries(ProgressbarTypes).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "barWidth",
    type: "number",
    if: (comp) => comp.type === "square" || comp.type === "circle",
  },
  {
    prop: "topRight",
    type: "checkbox",
    if: (comp) => comp.type === "square",
  },
];

export const EditProgressbar = () => {
  return (
    <EditSection title="Progressbar">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
