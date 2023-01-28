import { MockupProps, MockupTypes } from "@motionly/base";
import { ColorInput, SelectInput } from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditMockup = ({
  comp,
  setComp,
}: {
  comp: MockupProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Mockup">
      <SelectInput
        label="Type"
        value={comp.type}
        onChange={(type) =>
          setComp({
            ...comp,
            type: type as keyof typeof MockupTypes,
          })
        }
        options={Object.entries(MockupTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <ColorInput
        gradients
        label="Background"
        value={comp.bg}
        onChange={(bg) => setComp({ ...comp, bg })}
      />
    </EditSection>
  );
};
