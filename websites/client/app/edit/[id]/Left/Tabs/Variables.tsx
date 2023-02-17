import { InputTypes } from "@motionly/base";
import { VariableInput } from "../../../../../components/inputs";
import { getRandomId } from "../../../../../helpers";
import { useProject } from "../../../../../hooks/useProject";

export default function Variables() {
  const inputs = useProject((t) => t.project.template.inputs);
  const set = useProject((t) => t.set);
  return (
    <div className="w-full overflow-auto">
      {inputs?.allIds.map((id) => (
        <OneInput key={id} id={id} />
      ))}
      <button
        onClick={() =>
          set((s) => {
            const id = getRandomId();
            if (!s.project.template.inputs)
              s.project.template.inputs = { allIds: [], byIds: {} };
            const inputs = s.project.template.inputs;
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
  const input = useProject((t) => t.project.template.inputs?.byIds[id]);
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
            s.project.template.inputs!.byIds[id].label = label;
          })
        }
      />
      <VariableInput
        type="select"
        label="Type"
        value={input.type}
        options={InputTypes.options.map((value) => ({
          value,
          label: value,
        }))}
        onChange={(type) =>
          set((s) => {
            s.project.template.inputs!.byIds[id].type = type;
          })
        }
      />
      <VariableInput
        type={input.type || "text"}
        label="Default Value"
        value={input.value}
        onChange={(value) =>
          set((s) => {
            s.project.template.inputs!.byIds[id].value = value;
          })
        }
      />
      <button
        className="btn btn-error btn-xs"
        onClick={() =>
          set((s) => {
            const inputs = s.project.template.inputs!;
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
