import { MockupTypes } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "type",
    type: "select",
    options: Object.entries(MockupTypes).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "bg",
    type: "color",
  },
];

export const EditMockup = () => {
  return (
    <EditSection title="Mockup">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
