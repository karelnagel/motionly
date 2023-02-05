import { SidePanelDiv } from "./SidePanelDiv";
import { useStore } from "../../../../hooks/useStore";

export const SidePanel = () => {
  const selected = useStore((t) => t.selected);

  return (
    <SidePanelDiv show={!!selected}>
    </SidePanelDiv>
  );
};
