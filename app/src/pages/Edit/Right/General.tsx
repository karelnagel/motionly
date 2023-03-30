import { Right } from ".";
import { IoIosSettings } from "react-icons/io";
import { Input, Inputs } from "@motionly/inputs";
import { Comp } from "@motionly/composition";
import { useComponent, useStore } from "../../../store";
const inputs: { [key in keyof Comp]?: Inputs } = {
  top: { number: { label: "Top" } },
  left: { number: { label: "Left" } },
  width: { number: { label: "Width" } },
  height: { number: { label: "Height" } },
  rotation: { number: { label: "Rotation" } },
  opacity: { number: { label: "Opacity" } },
  duration: { number: { label: "Duration" } },
  from: { number: { label: "From" } },
};
export const general: Right = {
  icon: IoIosSettings,
  title: "General",
  component: () => {
    const component = useComponent();
    const editComponentProps = useStore((state) => state.editComponent);
    const entries = Object.entries(inputs);
    return (
      <div>
        {entries.map(([key, input]) => {
          const value = component[key as keyof Comp];
          return <Input key={key} value={value} onChange={(value) => editComponentProps({ [key]: value })} props={input} />;
        })}
      </div>
    );
  },
};
