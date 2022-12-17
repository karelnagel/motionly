import { TemplateType } from "@asius/types";
import { NumberInput, TextInput } from "../../../../components/inputs";

export const TemplateSidePanel = ({
  template,
  setTemplate,
}: {
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
}) => {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="font-bold text-xl">Template settings</h1>
      <div className="w-full grid grid-cols-2 gap-3">
        <TextInput
          label="Name"
          value={template.name}
          onChange={(name) => setTemplate({ ...template, name })}
        />
        <TextInput
          label="Description"
          value={template.description}
          onChange={(description) => setTemplate({ ...template, description })}
        />
        <NumberInput
          label="W"
          value={template.width}
          onChange={(width) => setTemplate({ ...template, width: width || 1 })}
        />
        <NumberInput
          label="H"
          value={template.height}
          onChange={(height) => setTemplate({ ...template, height: height || 1 })}
        />
        <NumberInput
          label="FPS"
          value={template.fps}
          onChange={(fps) => setTemplate({ ...template, fps: fps || 1 })}
        />
        <NumberInput
          label="Duration"
          value={template.duration}
          onChange={(duration) => setTemplate({ ...template, duration: duration || 1 })}
        />
      </div>
    </div>
  );
};
