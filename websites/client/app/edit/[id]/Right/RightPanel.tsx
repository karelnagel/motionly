import { SidePanelDiv } from "./RightDiv";
import { useProject } from "../../../../hooks/useProject";

export const SidePanel = () => {
  const selected = useProject((t) => t.selected);

  return <SidePanelDiv show={!!selected}>a</SidePanelDiv>;
};
