import { TextProps } from "@asius/components";
import { TextInput } from "../../../../../../components/inputs";
import { EditTextStyle } from "./EditTextStyle";
import { SetComp } from "./index";
import { EditSection } from "./EditSection";

export const EditText = ({
  comp,
  setComp,
}: {
  comp: TextProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Text">
      <TextInput
        label="Text"
        value={comp.text}
        onChange={(text) => setComp({ ...comp, text })}
      />
      <EditTextStyle
        style={comp.textStyle}
        setStyle={(textStyle) => setComp({ ...comp, textStyle })}
      />
    </EditSection>
  );
};
