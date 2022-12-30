import { QRCodeCompProps } from "@asius/types";
import { ColorInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditQRCode = ({ comp, setComp }: { comp: QRCodeCompProps; setComp: SetComp }) => {
  return (
    <EditSection title="QR Code">
      <TextInput label="Text" value={comp.text} onChange={(text) => setComp({ ...comp, text })} />
      <ColorInput
        label="Color"
        value={comp.color}
        onChange={(color) => setComp({ ...comp, color })}
      />
      <ColorInput
        label="Background"
        value={comp.background}
        onChange={(background) => setComp({ ...comp, background })}
      />
    </EditSection>
  );
};
