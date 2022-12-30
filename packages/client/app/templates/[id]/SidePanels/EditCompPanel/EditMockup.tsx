import { MockupCompProps, MockupTypes } from "@asius/types";
import { SelectInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditMockup = ({
  comp,
  setComp,
}: {
  comp: MockupCompProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Mockup">
      <SelectInput
        label="Type"
        value={comp.mockupType}
        onChange={(mockupType) =>
          setComp({
            ...comp,
            mockupType: mockupType as keyof typeof MockupTypes,
          })
        }
        options={Object.entries(MockupTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
    </EditSection>
  );
};
