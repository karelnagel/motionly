import { AudiogramPosition } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "src",
    type: "video",
  },
  {
    prop: "position",
    type: "select",
    options: Object.entries(AudiogramPosition).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "barWidth",
    type: "number",
  },
  {
    prop: "gap",
    type: "number",
  },
  {
    prop: "roundness",
    type: "number",
  },
  {
    prop: "color",
    type: "color",
  },
  {
    prop: "startFrom",
    type: "number",
  },
  {
    prop: "multiplier",
    type: "number",
  },
  {
    prop: "smoothing",
    type: "checkbox",
  },
  {
    prop: "mirror",
    type: "checkbox",
  },
];

export const EditAudiogram = () => {
  return (
    <EditSection title="Audiogram">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
