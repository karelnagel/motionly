import { DivProps } from "@asius/types";
import { ColorInput } from "../../../../../components/inputs";
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
        value={comp.background}
        onChange={(background) => setComp({ ...comp, background })}
      />
    </EditSection>
  );
};
