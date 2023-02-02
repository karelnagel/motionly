import { transformProps } from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { useComponent, useStore } from "../../../../../../hooks/useStore";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "x",
    type: "number",
  },
  {
    prop: "y",
    type: "number",
  },
  {
    prop: "width",
    type: "number",
  },
  {
    prop: "height",
    type: "number",
  },
  {
    prop: "borderRadius",
    type: "number",
  },
  {
    prop: "rotation",
    type: "number",
  },
  {
    prop: "from",
    type: "number",
  },
  {
    prop: "duration",
    type: "number",
  },
  {
    prop: "loopDuration",
    type: "number",
  },
  {
    prop: "opacity",
    type: "number",
  },
];
export const EditGeneral = () => {
  const comp = useComponent();
  const setComp = useStore((t) => t.setComp);
  if (!comp) return null;

  return (
    <EditSection>
      <Inputs inputs={inputs} />
      <Input
        type="checkbox"
        label="Motion Blur"
        className="col-span-2"
        value={!!comp.motionBlur}
        onChange={(motionBlur) =>
          setComp({ ...comp, motionBlur: motionBlur ? {} : undefined })
        }
      />
      {"childIds" in comp && (
        <Input
          type="checkbox"
          label="Play in Sequence"
          className="col-span-2"
          value={comp.isSequence}
          onChange={(isSequence) => setComp({ ...comp, isSequence })}
        />
      )}
      {comp.motionBlur && (
        <>
          <Input
            type="number"
            label="Motion Blur Lag (s)"
            value={comp.motionBlur.lag}
            placeholder="0.1"
            onChange={(lag) =>
              setComp({ ...comp, motionBlur: { ...comp.motionBlur, lag } })
            }
          />
          <Input
            type="number"
            label="Motion Blur Layers"
            value={comp.motionBlur.layers}
            placeholder="50"
            onChange={(layers) =>
              setComp({ ...comp, motionBlur: { ...comp.motionBlur, layers } })
            }
          />
          <Input
            type="number"
            label="Motion Blur Opacity"
            value={comp.motionBlur.opacity}
            placeholder="1"
            onChange={(opacity) =>
              setComp({ ...comp, motionBlur: { ...comp.motionBlur, opacity } })
            }
          />
        </>
      )}
      {comp.transform?.map(({ prop, value }, i) => (
        <>
          <Input
            type="select"
            key={i}
            label={`Transform ${i + 1}`}
            value={prop}
            onChange={(prop) =>
              setComp({
                ...comp,
                transform: comp.transform?.map((t, j) =>
                  i === j
                    ? { ...t, prop: prop as keyof typeof transformProps }
                    : t
                ),
              })
            }
            options={Object.entries(transformProps).map(
              ([value, { label }]) => ({
                label,
                value,
              })
            )}
          />
          <Input
            type="number"
            key={i}
            label={`Transform ${i + 1}`}
            value={value}
            onChange={(value) =>
              setComp({
                ...comp,
                transform: comp.transform?.map((t, j) =>
                  i === j ? { ...t, value: value } : t
                ),
              })
            }
          />
          <button
            className="btn btn-xs btn-error"
            onClick={() =>
              setComp({
                ...comp,
                transform: comp.transform?.filter((_, j) => i !== j),
              })
            }
          >
            Remove
          </button>
        </>
      ))}
      <button
        className="btn col-span-2"
        onClick={() => {
          setComp({
            ...comp,
            transform: [
              ...(comp.transform ?? []),
              { prop: "translateX", value: 0 },
            ],
          });
        }}
      >
        Add transform
      </button>
    </EditSection>
  );
};
