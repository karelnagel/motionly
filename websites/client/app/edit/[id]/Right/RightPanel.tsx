import { RightDiv } from "./RightDiv";
import { useProject } from "../../../../hooks/useProject";
import { Inputs } from "../../../../components/inputs/Inputs";
import { RightTabs } from "./Tabs";
import { useComponent } from "../../../../hooks/useComponent";

export const RightPanel = () => {
  const tab = useProject((t) => t.rightTab);
  const tabData = tab ? RightTabs[tab] : undefined;
  const comp = useComponent();
  return (
    <RightDiv show={true}>
      <div className="grid grid-cols-2 gap-2  w-auto overflow-auto">
        {tabData && tabData.inputs && comp && (
          <Inputs inputs={tabData.inputs} />
        )}
      </div>
    </RightDiv>
  );
};
