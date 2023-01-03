import { GraphProps, GraphTypes } from "@asius/components";
import {
  ColorInput,
  NumberInput,
  SelectInput,
} from "../../../../../components/inputs";
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
      <EditSection title="Data" level={1} className="col-span-2" hideByDefault>
        <div className="col-span-2 flex flex-col space-y-1 items-center">
          {comp.values.map((value, i) => (
            <div key={i} className="flex space-x-1 w-full">
              <NumberInput
                label={`Value ${i}`}
                value={value}
                onChange={(e) =>
                  setComp({
                    ...comp,
                    values: comp.values.map((v, j) => (j === i ? e : v)),
                  })
                }
              />
              <button
                onClick={() =>
                  setComp({
                    ...comp,
                    values: comp.values.filter((v, j) => j !== i),
                  })
                }
              >
                X
              </button>
            </div>
          ))}
          <button
            className="bg-primary p-2 rounded-lg text-primary-content px-3"
            onClick={() => setComp({ ...comp, values: [...comp.values, 1] })}
          >
            Add
          </button>
        </div>
      </EditSection>
      <SelectInput
        label="Type"
        value={comp.graphType}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(type) => setComp({ ...comp, graphType: type as any })}
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
        label="MAX"
        value={comp.max}
        onChange={(max) => setComp({ ...comp, max })}
      />
      <NumberInput
        label="MIN"
        value={comp.min}
        onChange={(min) => setComp({ ...comp, min })}
      />
      {comp.graphType === "bar" && (
        <>
          <NumberInput
            label="Gap"
            value={comp.gap}
            onChange={(gap) => setComp({ ...comp, gap })}
          />
          <NumberInput
            label="Round"
            value={comp.roundness}
            onChange={(roundness) => setComp({ ...comp, roundness })}
          />
        </>
      )}
      {comp.graphType === "line" && (
        <NumberInput
          label="Stroke"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
    </EditSection>
  );
};
