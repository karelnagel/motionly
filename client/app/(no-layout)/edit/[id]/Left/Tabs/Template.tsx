import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlerts } from "../../../../../../components/Alert";
import { Clone } from "../../../../../../components/Clone";
import { VariableInput } from "../../../../../../components/inputs";
import { useProject } from "../../../../../../hooks/useProject";
import { trpc } from "../../../../../ClientProvider";

export default function Template() {
  const set = useProject((t) => t.set);
  const project = useProject((t) => t.project);
  const router = useRouter();
  const alert = useAlerts((s) => s.addAlert);
  const { mutateAsync } = trpc.projects.delete.useMutation();
  const delTemplate = async () => {
    if (!project.id) return;
    const result = await mutateAsync({ id: project.id });
    if (!result) return alert("Failed to delete template", "error");
    alert("Template deleted", "success");
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-between h-full w-full overflow-auto">
      <div className="flex flex-col space-y-2 items-center">
        <div className="w-full space-y-2">
          <VariableInput
            type="textarea"
            label="Description"
            value={project.description}
            onChange={(description) =>
              set((state) => {
                state.project.description = description || "";
              })
            }
          />
          <VariableInput
            type="stringArray"
            label="Tags"
            value={project.tags}
            onChange={(tags) =>
              set((state) => {
                state.project.tags = tags || [];
              })
            }
          />
          <VariableInput
            type="number"
            label="Width"
            placeholder="1080"
            isTemplate={true}
            prop="width"
            value={project.template.width}
            onChange={(width) =>
              set((state) => {
                state.project.template.width = width || 1;
              })
            }
          />
          <VariableInput
            type="number"
            label="Height"
            placeholder="1080"
            prop="height"
            isTemplate={true}
            value={project.template.height}
            onChange={(height) =>
              set((state) => {
                state.project.template.height = height || 1;
              })
            }
          />
          <VariableInput
            type="number"
            label="FPS"
            placeholder="30"
            isTemplate={true}
            prop="fps"
            value={project.template.fps}
            onChange={(fps) =>
              set((state) => {
                state.project.template.fps = fps || 1;
              })
            }
          />
          <VariableInput
            type="number"
            label="Duration"
            value={project.template.duration}
            prop="duration"
            isTemplate={true}
            placeholder="10"
            onChange={(duration) =>
              set((state) => {
                state.project.template.duration = duration || 1;
              })
            }
          />
          <VariableInput
            type="color"
            label="Background"
            isTemplate={true}
            prop="background"
            value={project.template.bg}
            onChange={(bg) =>
              set((state) => {
                state.project.template.bg = bg;
              })
            }
          />
          <VariableInput
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
}
