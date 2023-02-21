import { PanelDiv } from "../../../../components/PanelDiv";
import { useProject } from "../../../../hooks/useProject";
import { Inputs, UserInput } from "../../../../components/inputs/Inputs";
import { RightTabs } from "./Tabs";
import { useComponent } from "../../../../hooks/useComponent";
import { ComponentProps } from "@motionly/base";

export const RightPanel = () => {
  const tab = useProject((t) => t.rightTab);
  const comp = useComponent();
  const tabId = tab !== "component" ? tab : comp?.comp;
  const tabData = tabId ? RightTabs[tabId] : undefined;
  return (
    <PanelDiv
      widthSelector={(s) => s.rightWidth}
      setWidthSelector={(s) => s.rightSetWidth}
    >
      {comp && tabData && (
        <div className="grid gap-2 w-auto ">
          {"inputs" in tabData && (
            <Inputs inputs={tabData.inputs as UserInput<ComponentProps>[]} />
          )}
          {"component" in tabData && <tabData.component />}
        </div>
      )}
    </PanelDiv>
  );
};
