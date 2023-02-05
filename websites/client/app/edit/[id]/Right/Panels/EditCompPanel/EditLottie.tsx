import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "src",
    type: "text",
  },
  {
    prop: "backwards",
    type: "checkbox",
  },
  {
    prop: "loop",
    type: "checkbox",
  },
  {
    prop: "playbackRate",
    type: "number",
  },
  {
    prop: "color",
    type: "color",
  },
];

export const EditLottie = () => {
  return (
    <EditSection title="Lottie">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
