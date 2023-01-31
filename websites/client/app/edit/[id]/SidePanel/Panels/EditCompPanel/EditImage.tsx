import { ObjectFit } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "src",
    type: "image",
  },
  {
    prop: "objectFit",
    type: "select",
    options: Object.entries(ObjectFit).map(([value, label]) => ({
      value,
      label,
    })),
  },
];

export const EditImage = () => {
  return (
    <EditSection title="Image">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
