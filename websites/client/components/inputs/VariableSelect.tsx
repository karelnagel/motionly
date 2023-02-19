import { InputTypes } from "@motionly/base";
import { getRandomId } from "../../helpers";
import { useProject } from "../../hooks/useProject";

export const VariableSelect = ({
    prop,
    type,
    value,
    label,
  }: {
    prop: string;
    type: InputTypes;
    value: any;
    label?: string;
  }) => {
    const inputs = useProject((t) => t.project.template.inputs);
    const set = useProject((t) => t.set);
    const setComp = useProject((t) => t.setComp);
  
    return (
      <div
        className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 cursor-pointer"
        tabIndex={0}
      >
        {inputs?.allIds.map((id) => {
          const input = inputs.byIds[id];
          if (input.type !== type) return null;
          return (
            <p
              key={id}
              onClick={() =>
                setComp((s) => {
                  if (!s.compInputs) s.compInputs = [];
                  s.compInputs.push({
                    id,
                    prop,
                  });
                })
              }
            >
              {input.label}
            </p>
          );
        })}
        <p
          onClick={() => {
            const id = getRandomId();
            set((s) => {
              if (!s.project.template.inputs)
                s.project.template.inputs = { allIds: [], byIds: {} };
              const inputs = s.project.template.inputs;
              inputs.allIds.push(id);
              inputs.byIds[id] = {
                id,
                label: label || prop,
                type,
                value,
              };
            });
            setComp((s) => {
              if (!s.compInputs) s.compInputs = [];
              s.compInputs.push({ id, prop });
            });
          }}
        >
          Add new
        </p>
      </div>
    );
  };
  