import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "bg",
    type: "color",
  },
];
export const EditDiv = () => {
  return (
    <EditSection title="Div">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
