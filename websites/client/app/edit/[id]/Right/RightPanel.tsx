import { RightDiv } from "./RightDiv";
import { useProject } from "../../../../hooks/useProject";

export const RightPanel = () => {
  const selected = useProject((t) => t.selected);

  return <RightDiv show={!!selected}>a</RightDiv>;
};
