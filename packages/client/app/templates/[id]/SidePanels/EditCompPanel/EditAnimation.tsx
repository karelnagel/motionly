import { CompProps } from "@asius/types";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditAnimation = (s: { comp: CompProps; setComp: SetComp }) => {
  return <EditSection title="Animation">{s.comp.borderRadius}</EditSection>;
};
