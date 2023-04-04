import { Right } from ".";
import { IoIosSettings } from "react-icons/io";
import { Input, Inputs } from "../../../inputs";
import { Comp } from "../../../composition";
import { useComponent, useTemplateStore } from "../../../store";

const inputs: { [key in keyof Comp]?: Inputs } = {
  x: { number: { label: "X" } },
  y: { number: { label: "Y" } },
  width: { number: { label: "Width" } },
  height: { number: { label: "Height" } },
  rotation: { range: { label: "Rotation", min: 0, max: 360, step: 1 } },
  opacity: { range: { label: "Opacity", min: 0, max: 1, step: 0.01 } },
  duration: { number: { label: "Duration" } },
  from: { number: { label: "From" } },
};

export const general: Right = {
  icon: IoIosSettings,
  title: "General",
  show: (c) => !!c,
  component: () => {
    const component = useComponent();
    const editComponent = useTemplateStore((state) => state.editComponent);
    const entries = Object.entries(inputs);
    return (
      <div className="space-y-2">
        {entries.map(([key, input]) => {
          const value = component[key as keyof Comp];
          return <Input key={key} value={value} onChange={(value) => editComponent({ [key]: value }, false)} props={input} />;
        })}
      </div>
    );
  },
};
