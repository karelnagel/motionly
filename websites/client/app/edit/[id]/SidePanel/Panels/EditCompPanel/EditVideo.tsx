import { ObjectFit } from "@motionly/base";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "src",
    type: "video",
  },
  {
    prop: "objectFit",
    type: "select",
    options: Object.entries(ObjectFit).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "startFrom",
    type: "number",
  },
  {
    prop: "muted",
    type: "checkbox",
  },
  {
    prop: "volume",
    type: "number",
  },
  {
    prop: "offthread",
    type: "checkbox",
  },
];

export const EditVideo = () => {
  return (
    <EditSection title="Video">
      <Inputs inputs={inputs} />
    </EditSection>
  );
};
