import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlerts } from "../../../../../components/Alert";
import { Clone } from "../../../../../components/Clone";
import { Input } from "../../../../../components/inputs";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { useTemplate } from "../../../../../hooks/useTemplate";
import { deleteTemplate } from "../../../../../sdk/templates/delete";

export const TemplateSidePanel = () => {
  const { template, setTemplate } = useTemplate();
  const router = useRouter();
  const alert = useAlerts();

  const delTemplate = async () => {
    if (!template.id) return;
    const result = await deleteTemplate({ id: template.id });
    if (!result) return alert("Failed to delete template", "error");
    alert("Template deleted", "success");
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-between h-full w-full overflow-auto">
      <div className="flex flex-col space-y-2 items-center">
        <PanelTitle title="Template settings" />
        <div className="w-full grid grid-cols-2 gap-x-1">
          <Input
            type="text"
            label="Name"
            value={template.name}
            onChange={(name) =>
              setTemplate({ ...template, name: name || template.name })
            }
          />
          <Input
            type="text"
            label="Description"
            value={template.description}
            onChange={(description) =>
              setTemplate({
                ...template,
                description: description || template.description,
              })
            }
          />
          <Input
            type="number"
            label="Width"
            placeholder="1080"
            prop="width"
            value={template.width}
            onChange={(width) =>
              setTemplate({ ...template, width: width || 1 })
            }
          />
          <Input
            type="number"
            label="Height"
            placeholder="1080"
            prop="height"
            value={template.height}
            onChange={(height) =>
              setTemplate({ ...template, height: height || 1 })
            }
          />
          <Input
            type="number"
            label="FPS"
            placeholder="30"
            prop="fps"
            value={template.fps}
            onChange={(fps) => setTemplate({ ...template, fps: fps || 1 })}
          />
          <Input
            type="number"
            label="Duration"
            value={template.duration}
            prop="duration"
            placeholder="10"
            onChange={(duration) =>
              setTemplate({ ...template, duration: duration || 1 })
            }
          />
          <Input
            type="color"
            label="Background"
            prop="background"
            value={template.background}
            onChange={(background) => setTemplate({ ...template, background })}
          />
          <Input
            type="checkbox"
            label="Public"
            value={template.public}
            onChange={(public_) =>
              setTemplate({ ...template, public: public_ })
            }
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Clone template={template} className="btn btn-sm">
          Duplicate
        </Clone>
        <Link href={`/templates/${template.id}`} className="btn btn-sm">
          View
        </Link>
        <button onClick={delTemplate} className="btn btn-error btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
};
