import { Right } from ".";
import { IoIosSettings } from "react-icons/io";
import { Inputs } from "../../../inputs";
import { Comp } from "../../../composition";
import { useComponent, useTemplateStore } from "../../../store";

const inputs: Inputs<Comp> = {
  x: { number: { label: "X", colspan: 1 } },
  y: { number: { label: "Y", colspan: 1 } },
  height: { number: { label: "H", colspan: 1 } },
  width: { number: { label: "W", colspan: 1 } },
  from: { number: { label: "From", colspan: 1 } },
  duration: { number: { label: "Duration", colspan: 1 } },
  rotation: { range: { label: "Rotation", min: 0, max: 360, step: 1, colspan: 1 } },
  opacity: { range: { label: "Opacity", min: 0, max: 1, step: 0.01, colspan: 1 } },
};
export const general: Right = {
  icon: IoIosSettings,
  title: "General",
  component: () => {
    const comp = useComponent();
    const editComponent = useTemplateStore((state) => state.editComponent);
    if (!comp) return null;
    return <Inputs inputs={inputs} value={comp} onChange={(v) => editComponent(v, false, undefined)} />;
  },
};
