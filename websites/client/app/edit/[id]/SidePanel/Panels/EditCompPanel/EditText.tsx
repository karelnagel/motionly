import { JustifyContent, TextProps } from "@motionly/base";
import { SelectInput, TextInput } from "../../../../../../components/inputs";
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
        area
        value={comp.text}
        onChange={(text) => setComp({ ...comp, text })}
      />
      <SelectInput
        label="Justify content"
        value={comp.justifyContent}
        onChange={(justifyContent) =>
          setComp({
            ...comp,
            justifyContent: justifyContent as keyof typeof JustifyContent,
          })
        }
        options={Object.entries(JustifyContent).map(([value, label]) => ({
          label,
          value,
        }))}
      />

      <EditTextStyle
        style={comp.textStyle}
        setStyle={(textStyle) => setComp({ ...comp, textStyle })}
      />
    </EditSection>
  );
};
