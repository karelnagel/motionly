import { VariableTypes } from "@motionly/base";
import { getRandomId } from "../../helpers";
import { useProject } from "../../hooks/useProject";

export const VariableSelect = ({
  prop,
  type,
  value,
  label,
}: {
  prop: string;
  type: VariableTypes;
  value: any;
  label?: string;
}) => {
  const variables = useProject((t) => t.project.template.variables);
  const set = useProject((t) => t.set);
  const setComp = useProject((t) => t.setComp);

  return (
    <div
      className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 cursor-pointer"
      tabIndex={0}
    >
      {variables?.allIds.map((id) => {
        const input = variables.byIds[id];
        if (input.type !== type) return null;
        return (
          <p
            key={id}
            onClick={() =>
              setComp((s) => {
                if (!s.compVariables) s.compVariables = [];
                s.compVariables.push({
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
            if (!s.project.template.variables)
              s.project.template.variables = { allIds: [], byIds: {} };
            const inputs = s.project.template.variables;
            inputs.allIds.push(id);
            inputs.byIds[id] = {
              id,
              label: label || prop,
              type,
              value,
            };
          });
          setComp((s) => {
            if (!s.compVariables) s.compVariables = [];
            s.compVariables.push({ id, prop });
          });
        }}
      >
        Add new
      </p>
    </div>
  );
};
