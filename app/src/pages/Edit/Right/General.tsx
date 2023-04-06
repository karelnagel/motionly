import { Right } from ".";
import { IoIosSettings } from "react-icons/io";
import { Inputs } from "@motionly/inputs";
import { Comp } from "../../../composition";
import { useComponent, useTemplateStore } from "../../../store";

const inputs: Inputs<Comp> = {
  x: { number: { label: "X" } },
  y: { number: { label: "Y" } },
  height: { number: { label: "H" } },
  width: { number: { label: "W" } },
  from: { number: { label: "From" } },
  duration: { number: { label: "Duration" } },
  rotation: { range: { label: "Rotation", min: 0, max: 360, step: 1, colspan: 2 } },
  opacity: { range: { label: "Opacity", min: 0, max: 1, step: 0.01, colspan: 2 } },
};
export const general: Right = {
  icon: IoIosSettings,
  title: "General",
  component: () => {
    const comp = useComponent();
    const editComponent = useTemplateStore((state) => state.editComponent);
    if (!comp) return null;
    return <Inputs cols={2} inputs={inputs} value={comp} onChange={(v) => editComponent(v, false, undefined)} />;
  },
};
