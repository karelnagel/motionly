import { deleteTemplate, postNewTemplate } from "@asius/sdk";
import { TemplateType } from "@asius/components";
import { useRouter } from "next/navigation";
import {
  BooleanInput,
  NumberInput,
  TextInput,
} from "../../../../components/inputs";

export const TemplateSidePanel = ({
  template,
  setTemplate,
}: {
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
}) => {
  const router = useRouter();
  const delTemplate = async () => {
    if (!template.id) return;
    const result = await deleteTemplate({ id: template.id });
    if (!result) return alert("Failed to delete template");
    alert("Template deleted");
    router.push("/");
  };
  const cloneTemplate = async () => {
    const newTemplate = await postNewTemplate(template);
    if (!newTemplate) return alert("Cloning failed");
    alert("Cloning successful");
    router.push(`/templates/${newTemplate.id}`);
  };
  return (
    <div className="flex flex-col justify-between h-full">
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
            onChange={(description) =>
              setTemplate({ ...template, description })
            }
          />
          <NumberInput
            label="W"
            value={template.width}
            onChange={(width) =>
              setTemplate({ ...template, width: width || 1 })
            }
          />
          <NumberInput
            label="H"
            value={template.height}
            onChange={(height) =>
              setTemplate({ ...template, height: height || 1 })
            }
          />
          <NumberInput
            label="FPS"
            value={template.fps}
            onChange={(fps) => setTemplate({ ...template, fps: fps || 1 })}
          />
          <NumberInput
            label="Duration"
            value={template.duration}
            onChange={(duration) =>
              setTemplate({ ...template, duration: duration || 1 })
            }
          />
          <BooleanInput
            label="Public"
            value={template.public}
            onChange={(public_) =>
              setTemplate({ ...template, public: public_ })
            }
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={cloneTemplate}
          className="py-1 px-2 bg-primary rounded-lg shadow-lg text-primary-content hover:scale-105 duration-200"
        >
          Duplicate
        </button>
        <button
          onClick={delTemplate}
          className="py-1 px-2 bg-error rounded-lg shadow-lg text-error-content hover:scale-105 duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
