import { GraphProps, GraphTypes } from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { ShowJson } from "../../../../../../components/ShowJson";
import { useComponent } from "../../../../../../hooks/useComponent";
import { useStore } from "../../../../../../hooks/useStore";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "type",
    type: "select",
    options: Object.entries(GraphTypes).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    prop: "color",
    type: "color",
  },
  {
    prop: "max",
    type: "number",
  },
  {
    prop: "min",
    type: "number",
  },
  {
    prop: "gap",
    type: "number",
    if: (comp) => comp.type === "bar",
  },
  {
    prop: "roundness",
    type: "number",
    if: (comp) => comp.type === "bar",
  },
  {
    prop: "strokeWidth",
    type: "number",
    if: (comp) => comp.type === "line",
  },
];

export const EditGraph = () => {
  const comp = useComponent() as GraphProps;
  const setComp = useStore((t) => t.setComp)<GraphProps>;

  return (
    <EditSection title="Graph">
      <Inputs inputs={inputs} />
      <ShowJson
        label="Values"
        json={JSON.stringify(comp.src)}
        onChange={(json) =>
          setComp((c) => {
            if (json) c.src = JSON.parse(json);
          })
        }
      >
        {comp.src.map((src, i) => (
          <div key={i} className="flex space-x-1 w-full items-end ">
            <Input
              type="number"
              label={`Value ${i + 1}`}
              value={src}
              onChange={(e) =>
                setComp((c) => {
                  c.src = c.src.map((v, j) => (j === i ? e || 0 : v));
                })
              }
            />
            <button
              className="btn btn-xs btn-error"
              onClick={() =>
                setComp((c) => {
                  c.src = comp.src.filter((v, j) => j !== i);
                })
              }
            >
              X
            </button>
          </div>
        ))}
        <button
          className="bg-primary p-2 rounded-lg text-primary-content px-3"
          onClick={() =>
            setComp((c) => {
              c.src.push(1);
            })
          }
        >
          Add
        </button>
      </ShowJson>
    </EditSection>
  );
};
