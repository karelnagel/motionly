import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { EditSection } from "./EditSection";

const input: UserInput[] = [
  {
    prop: "text",
    type: "text",
  },
  {
    prop: "color",
    type: "color",
  },
  {
    prop: "bg",
    type: "color",
  },
];

export const EditQRCode = () => {
  return (
    <EditSection title="QR Code">
      <Inputs inputs={input} />
    </EditSection>
  );
};
