import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlerts } from "../../../../../components/Alert";
import { Clone } from "../../../../../components/Clone";
import { Input } from "../../../../../components/inputs";
import { PanelTitle } from "../../../../../components/PanelTitle";
import { useStore } from "../../../../../hooks/useStore";
import { deleteProject } from "../../../../../sdk/templates/delete";

export const TemplateSidePanel = () => {
  const set = useStore((t) => t.set);
  const project = useStore((t) => t.project);
  const router = useRouter();
  const alert = useAlerts();

  const delTemplate = async () => {
    if (!project.id) return;
    const result = await deleteProject({ id: project.id });
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
            value={project.name}
            onChange={(name) =>
              set((state) => {
                state.project.name = name || "";
              })
            }
          />
          <Input
            type="text"
            label="Description"
            value={project.description}
            onChange={(description) =>
              set((state) => {
                state.project.description = description || "";
              })
            }
          />
          <Input
            type="number"
            label="Width"
            placeholder="1080"
            prop="width"
            value={project.template.width}
            onChange={(width) =>
              set((state) => {
                state.project.template.width = width || 1;
              })
            }
          />
          <Input
            type="number"
            label="Height"
            placeholder="1080"
            prop="height"
            value={project.template.height}
            onChange={(height) =>
              set((state) => {
                state.project.template.height = height || 1;
              })
            }
          />
          <Input
            type="number"
            label="FPS"
            placeholder="30"
            prop="fps"
            value={project.template.fps}
            onChange={(fps) =>
              set((state) => {
                state.project.template.fps = fps || 1;
              })
            }
          />
          <Input
            type="number"
            label="Duration"
            value={project.template.duration}
            prop="duration"
            placeholder="10"
            onChange={(duration) =>
              set((state) => {
                state.project.template.duration = duration || 1;
              })
            }
          />
          <Input
            type="color"
            label="Background"
            prop="background"
            value={project.template.bg}
            onChange={(bg) =>
              set((state) => {
                state.project.template.bg = bg;
              })
            }
          />
          <Input
            type="checkbox"
            label="Public"
            value={project.public}
            onChange={(public_) =>
              set((state) => {
                state.project.public = public_;
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Clone project={project} className="btn btn-sm">
          Duplicate
        </Clone>
        <Link href={`/templates/${project.id}`} className="btn btn-sm">
          View
        </Link>
        <button onClick={delTemplate} className="btn btn-error btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
};