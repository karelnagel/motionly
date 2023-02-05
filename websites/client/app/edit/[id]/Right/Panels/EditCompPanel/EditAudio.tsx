import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";
const inputs: UserInput[] = [
  {
    prop: "src",
    type: "video",
  },
  {
    prop: "volume",
    type: "number",
  },
  {
    prop: "startFrom",
    type: "number",
  },
];

export const EditAudio = () => {
  return (
    <EditSection title="Audio">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
