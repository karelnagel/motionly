import { JustifyContent } from "@motionly/base";
import { EditSection } from "./EditSection";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";

const inputs: UserInput[] = [
  {
    prop: "text",
    type: "textarea",
  },
  {
    prop: "justifyContent",
    type: "select",
    options: Object.entries(JustifyContent).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "textStyle",
    type: "style",
  },
];
export const EditText = () => {
  return (
    <EditSection title="Text">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
