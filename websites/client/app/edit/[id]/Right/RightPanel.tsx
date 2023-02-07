import { SidePanelDiv } from "./RightDiv";
import { useProject } from "../../../../hooks/useStore";

export const SidePanel = () => {
  const selected = useProject((t) => t.selected);

  return <SidePanelDiv show={!!selected}>
    a
  </SidePanelDiv>;
};
