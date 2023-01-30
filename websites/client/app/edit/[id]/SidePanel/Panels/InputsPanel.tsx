import { Input as InputType, inputTypes } from "@motionly/base";
import { Input } from "../../../../../components/inputs";
import { getRandomId } from "../../../../../helpers";
import { useTemplate } from "../../../../../hooks/useTemplate";

export const InputsPanel = () => {
  const { template, setTemplate } = useTemplate();
  const setInputs = (inputs?: InputType[]) => {
    setTemplate({ ...template, inputs });
  };
  const onChange = (id?: string, value?: any) => {
    setInputs(
      template.inputs?.map((input) =>
        input.id === id ? { ...input, value } : input
      )
    );
  };
  return (
    <div className="w-full">
      {template.inputs?.map((input) => (
        <div key={input.id} className="w-full">
          <Input
            type="text"
            label="Label"
            value={input.label}
            onChange={(label) => {
              setInputs(
                template.inputs?.map((inp) =>
                  input.id === inp.id ? { ...inp, label } : inp
                )
              );
            }}
          />
          <Input
            type="select"
            label="Type"
            value={input.type}
            options={Object.entries(inputTypes).map(([value, label]) => ({
              value,
              label,
            }))}
            onChange={(type) => {
              setInputs(
                template.inputs?.map((inp) =>
                  input.id === inp.id
                    ? { ...inp, type: type as keyof typeof inputTypes }
                    : inp
                )
              );
            }}
          />
          <Input
            type={input.type || "text"}
            label="Default Value"
            value={input.value}
            onChange={(value) => onChange(input.id, value)}
          />
          <button
            className="btn btn-error btn-xs"
            onClick={() =>
              setInputs(template.inputs?.filter((i) => i.id !== input.id))
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          setInputs([
            ...(template.inputs || []),
            {
              id: getRandomId(),
              type: "text",
              label: `Label ${template.inputs?.length}`,
            },
          ])
        }
      >
        Add
      </button>
    </div>
  );
};
