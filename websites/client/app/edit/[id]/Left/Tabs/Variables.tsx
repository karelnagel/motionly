import { VariableInput } from "../../../../../components/inputs";
import { useProject } from "../../../../../hooks/useProject";

export default function Variables() {
  const variables = useProject((t) => t.project.template.variables);
  return (
    <div className="w-full overflow-auto space-y-4">
      {variables?.allIds.map((id) => (
        <OneInput key={id} id={id} />
      ))}
    </div>
  );
}

export const OneInput = ({ id }: { id: string }) => {
  const input = useProject((t) => t.project.template.variables?.byIds[id]);
  const set = useProject((t) => t.set);
  if (!input) return null;

  return (
    <div className="w-full space-y-2">
      <VariableInput
        type="text"
        value={input.label}
        onChange={(label) =>
          set((s) => {
            s.project.template.variables!.byIds[id].label = label;
          })
        }
      />
      <VariableInput
        type={input.type as any}
        value={input.value}
        onChange={(value: any) =>
          set((s) => {
            s.project.template.variables!.byIds[id].value = value;
          })
        }
      />
      <button
        className="btn btn-error btn-xs"
        onClick={() =>
          set((s) => {
            const inputs = s.project.template.variables!;
            inputs.allIds = inputs.allIds.filter((i) => i !== id);
            delete inputs.byIds[id];
          })
        }
      >
        Remove
      </button>
    </div>
  );
};
