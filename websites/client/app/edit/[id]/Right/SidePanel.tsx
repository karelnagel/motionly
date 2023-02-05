import { isPanel } from "../../../../helpers";
import { AddSidePanel } from "./Panels/AddSidePanel";
import { AISidePanel } from "./Panels/AISidePanel";
import { EditCompPanel } from "./Panels/EditCompPanel";
import { ExportSidePanel } from "./Panels/ExportSidePanel";
import { SidePanelDiv } from "./SidePanelDiv";
import { TemplateSidePanel } from "./Panels/TemplateSidePanel";
import { InputsPanel } from "./Panels/InputsPanel";
import { useStore } from "../../../../hooks/useStore";

export const SidePanel = () => {
  const selected = useStore((t) => t.selected);

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
