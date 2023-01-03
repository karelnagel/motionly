import { ComponentProps } from "@asius/components";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditAnimation = (s: {
  comp: ComponentProps;
  setComp: SetComp;
}) => {
  return <EditSection title="Animation">{s.comp.borderRadius}</EditSection>;
};
