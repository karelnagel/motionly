import { Left } from ".";
import { IoIosSettings } from "react-icons/io";
import { useTemplateStore, useTemplate } from "../../../store";
import { Inputs } from "@motionly/inputs";
import { Template } from "../../../composition";

const templateInputs: Inputs<Template> = {
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
    return <Inputs inputs={templateInputs} value={template} onChange={(v) => editTemplate(v, false, undefined)} />;
  },
};
