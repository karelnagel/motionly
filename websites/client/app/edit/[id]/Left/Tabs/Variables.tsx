import { VariableTypes } from "@motionly/base";
import { VariableInput } from "../../../../../components/inputs";
import { getRandomId } from "../../../../../helpers";
import { useProject } from "../../../../../hooks/useProject";

export default function Variables() {
  const variables = useProject((t) => t.project.template.variables);
  const set = useProject((t) => t.set);
  return (
    <div className="w-full overflow-auto">
      {variables?.allIds.map((id) => (
        <OneInput key={id} id={id} />
      ))}
      <button
        onClick={() =>
          set((s) => {
            const id = getRandomId();
            if (!s.project.template.variables)
              s.project.template.variables = { allIds: [], byIds: {} };
            const inputs = s.project.template.variables;
            inputs.allIds.push(id);
            inputs.byIds[id] = {
              id,
              label: "Label",
              type: "text",
              value: "",
            };
          })
        }
      >
        Add
      </button>
    </div>
  );
}

export const OneInput = ({ id }: { id: string }) => {
  const input = useProject((t) => t.project.template.variables?.byIds[id]);
  const set = useProject((t) => t.set);
  if (!input) return null;

  return (
    <div className="w-full">
      <VariableInput
        type="text"
        label="Label"
        value={input.label}
        onChange={(label) =>
          set((s) => {
            s.project.template.variables!.byIds[id].label = label;
          })
        }
      />
      <VariableInput
        type="select"
        label="Type"
        value={input.type}
        options={VariableTypes.options.map((value) => ({
          value,
          label: value,
        }))}
        onChange={(type) =>
          set((s) => {
            if (type) s.project.template.variables!.byIds[id].type = type as any;
          })
        }
      />
      <VariableInput
        type={input.type || "text"}
        label="Default Value"
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
