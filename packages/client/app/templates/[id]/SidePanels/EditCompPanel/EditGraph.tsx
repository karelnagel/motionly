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
          {comp.src.map((src, i) => (
            <div key={i} className="flex space-x-1 w-full">
              <NumberInput
                label={`Value ${i}`}
                value={src}
                onChange={(e) =>
                  setComp({
                    ...comp,
                    src: comp.src.map((v, j) => (j === i ? e || 0 : v)),
                  })
                }
              />
              <button
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
        </div>
      </EditSection>
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
        label="MAX"
        value={comp.max}
        onChange={(max) => setComp({ ...comp, max })}
      />
      <NumberInput
        label="MIN"
        value={comp.min}
        onChange={(min) => setComp({ ...comp, min })}
      />
      {comp.type === "bar" && (
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
      {comp.type === "line" && (
        <NumberInput
          label="Stroke"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
    </EditSection>
  );
};
