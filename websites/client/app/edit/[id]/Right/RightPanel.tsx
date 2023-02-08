import { RightDiv } from "./RightDiv";
import { useProject } from "../../../../hooks/useProject";
import { Inputs, UserInput } from "../../../../components/inputs/Inputs";
import { RightTabs } from "./Tabs";
import { useComponent } from "../../../../hooks/useComponent";
import { ComponentProps } from "@motionly/base";

export const RightPanel = () => {
  const tab = useProject((t) => t.rightTab);
  const tabData = tab ? RightTabs[tab] : undefined;
  const comp = useComponent();
  return (
    <RightDiv show={true}>
      <div className="grid grid-cols-2 gap-2 w-auto ">
        {tabData && comp && (
          <Inputs inputs={tabData.inputs as UserInput<ComponentProps>[]} />
        )}
      </div>
    </RightDiv>
  );
};
