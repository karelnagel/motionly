import { Left } from ".";
import { IoIosSettings } from "react-icons/io";
import { useTemplateStore, useTemplate } from "../../../store";
import { Input, Inputs } from "../../../inputs";
import { Template } from "../../../composition";

const templateInputs: { [key in keyof Template]?: Inputs } = {
  width: { number: { label: "Width" } },
  height: { number: { label: "Height" } },
  duration: { number: { label: "Duration" } },
  fps: { number: { label: "FPS" } },
  background: { color: { label: "Background" } },
};
export const template: Left = {
  icon: IoIosSettings,
  title: "Template",
  component: () => {
    const template = useTemplate();
    const editTemplate = useTemplateStore((state) => state.editTemplate);
    return (
      <div>
        {Object.entries(templateInputs).map(([key, input]) => {
          const value = template[key as keyof typeof templateInputs];
          return <Input key={key} value={value} onChange={(value) => editTemplate({ [key]: value })} props={input} />;
        })}
      </div>
    );
  },
};
