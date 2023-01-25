import { DivProps } from "@motionly/base";
import { ColorInput } from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditDiv = ({
  comp,
  setComp,
}: {
  comp: DivProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Div">
      <ColorInput
        label="BG"
        value={comp.bg}
        onChange={(bg) => setComp({ ...comp, bg })}
      />
    </EditSection>
  );
};
