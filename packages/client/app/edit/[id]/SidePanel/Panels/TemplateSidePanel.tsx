import { deleteTemplate } from "@asius/sdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlerts } from "../../../../../components/Alert";
import { Clone } from "../../../../../components/Clone";
import {
  BooleanInput,
  ColorInput,
  NumberInput,
  TextInput,
} from "../../../../../components/inputs";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { useTemplate } from "../../../../../hooks/useTemplate";

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
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col space-y-4 items-center">
        <PanelTitle title="Template settings" />
        <div className="w-full grid grid-cols-2 gap-2">
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
          <ColorInput
            label="Background"
            value={template.background}
            onChange={(background) => setTemplate({ ...template, background })}
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
        <Clone template={template} className="btn">
          Duplicate
        </Clone>
        <Link href={`/templates/${template.id}`} className="btn">
          View
        </Link>
        <button onClick={delTemplate} className="btn btn-error">
          Delete
        </button>
      </div>
    </div>
  );
};
