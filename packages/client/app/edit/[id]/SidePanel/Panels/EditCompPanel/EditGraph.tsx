import { GraphProps, GraphTypes } from "@asius/components";
import {
  ColorInput,
  NumberInput,
  SelectInput,
} from "../../../../../../components/inputs";
import { ShowJson } from "../../../../../../components/ShowJson";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGraph = ({
  comp,
  setComp,
}: {
  comp: GraphProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Graph">
      <SelectInput
        label="Type"
        value={comp.type}
        onChange={(type) =>
          setComp({ ...comp, type: type as keyof typeof GraphTypes })
        }
        options={Object.entries(GraphTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <ColorInput
        label="Color"
        value={comp.color}
        onChange={(color) => setComp({ ...comp, color })}
      />
      <NumberInput
        label="Max"
        value={comp.max}
        onChange={(max) => setComp({ ...comp, max })}
      />
      <NumberInput
        label="Min"
        value={comp.min}
        onChange={(min) => setComp({ ...comp, min })}
      />
      {comp.type === "bar" && (
        <>
          <NumberInput
            label="Gap (px)"
            placeholder="0"
            value={comp.gap}
            onChange={(gap) => setComp({ ...comp, gap })}
          />
          <NumberInput
            label="Round (px)"
            placeholder="0"
            value={comp.roundness}
            onChange={(roundness) => setComp({ ...comp, roundness })}
          />
        </>
      )}
      {comp.type === "line" && (
        <NumberInput
          label="Stroke (px)"
          placeholder="0"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
      <ShowJson
        label="Values"
        json={JSON.stringify(comp.src)}
        onChange={(json) => setComp({ ...comp, src: JSON.parse(json) })}
      >
        {comp.src.map((src, i) => (
          <div key={i} className="flex space-x-1 w-full items-end ">
            <NumberInput
              label={`Value ${i + 1}`}
              value={src}
              onChange={(e) =>
                setComp({
                  ...comp,
                  src: comp.src.map((v, j) => (j === i ? e || 0 : v)),
                })
              }
            />
            <button
              className="btn btn-xs btn-error"
              onClick={() =>
                setComp({
                  ...comp,
                  src: comp.src.filter((v, j) => j !== i),
                })
              }
            >
              X
            </button>
          </div>
        ))}
        <button
          className="bg-primary p-2 rounded-lg text-primary-content px-3"
          onClick={() => setComp({ ...comp, src: [...comp.src, 1] })}
        >
          Add
        </button>
      </ShowJson>
    </EditSection>
  );
};
