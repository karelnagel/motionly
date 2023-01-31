import { isPanel } from "../../../../helpers";
import { useTemplate } from "../../../../hooks/useTemplate";
import { AddSidePanel } from "./Panels/AddSidePanel";
import { AISidePanel } from "./Panels/AISidePanel";
import { EditCompPanel } from "./Panels/EditCompPanel";
import { ExportSidePanel } from "./Panels/ExportSidePanel";
import { SidePanelDiv } from "./SidePanelDiv";
import { TemplateSidePanel } from "./Panels/TemplateSidePanel";
import { InputsPanel } from "./Panels/InputsPanel";

export const SidePanel = () => {
  const { selected } = useTemplate();

  return (
    <SidePanelDiv show={!!selected}>
      {!isPanel(selected) && <EditCompPanel />}
      {selected === "template" && <TemplateSidePanel />}
      {selected === "export" && <ExportSidePanel />}
      {selected === "add" && <AddSidePanel />}
      {selected === "ai" && <AISidePanel />}
      {selected === "inputs" && <InputsPanel />}
    </SidePanelDiv>
  );
};
