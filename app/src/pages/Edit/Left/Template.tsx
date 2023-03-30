import { Left } from ".";
import { IoIosAdd } from "react-icons/io";
import { useStore, useTemplate } from "../../../store";
import { Input, Inputs } from "@motionly/inputs";
import { Template } from "@motionly/composition";

const templateInputs: { [key in keyof Template]?: Inputs } = {
  width: { number: { label: "Width" } },
  height: { number: { label: "Height" } },
  duration: { number: { label: "Duration" } },
  fps: { number: { label: "FPS" } },
  background: { color: { label: "Background" } },
};
export const template: Left = {
  icon: () => <IoIosAdd />,
  title: "Template",
  component: () => {
    const template = useTemplate();
    const editTemplate = useStore((state) => state.editTemplate);
    return (
      <div>
        {Object.entries(templateInputs).map(([key, input]) => {
          const value = template[key as keyof Template];
          return <Input key={key} value={value} onChange={(value) => editTemplate({ [key]: value })} props={input} />;
        })}
      </div>
    );
  },
};
