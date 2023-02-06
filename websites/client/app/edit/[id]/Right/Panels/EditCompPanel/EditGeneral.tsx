import { transformProps } from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { useComponent } from "../../../../../../hooks/useComponent";
import { useProject } from "../../../../../../hooks/useStore";
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
  const setComp = useProject((t) => t.setComp);
  if (!comp) return null;

  return (
    <EditSection>
      <Inputs inputs={inputs} />

      {"childIds" in comp && (
        <Input
          type="checkbox"
          label="Play in Sequence"
          className="col-span-2"
          value={comp.isSequence}
          onChange={(isSequence) =>
            setComp((c) => {
              if ("childIds" in c) c.isSequence = isSequence;
            })
          }
        />
      )}
      <Input
        type="checkbox"
        label="Motion Blur"
        className="col-span-2"
        value={!!comp.motionBlur}
        onChange={(motionBlur) =>
          setComp((c) => {
            c.motionBlur = motionBlur ? {} : undefined;
          })
        }
      />
      {comp.motionBlur && (
        <>
          <Input
            type="number"
            label="Motion Blur Lag (s)"
            value={comp.motionBlur.lag}
            placeholder="0.1"
            onChange={(lag) =>
              setComp((c) => {
                c.motionBlur!.lag = lag;
              })
            }
          />
          <Input
            type="number"
            label="Motion Blur Layers"
            value={comp.motionBlur.layers}
            placeholder="50"
            onChange={(layers) =>
              setComp((c) => {
                c.motionBlur!.layers = layers;
              })
            }
          />
          <Input
            type="number"
            label="Motion Blur Opacity"
            value={comp.motionBlur.opacity}
            placeholder="1"
            onChange={(opacity) =>
              setComp((c) => {
                c.motionBlur!.opacity = opacity;
              })
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
              setComp((c) => {
                c.transform = c.transform?.map((t, j) =>
                  i === j
                    ? { ...t, prop: prop as keyof typeof transformProps }
                    : t
                );
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
              setComp((c) => {
                c.transform = c.transform?.map((t, j) =>
                  i === j ? { ...t, value: value } : t
                );
              })
            }
          />
          <button
            className="btn btn-xs btn-error"
            onClick={() =>
              setComp((c) => {
                c.transform = c.transform?.filter((_, j) => i !== j);
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
          setComp((c) => {
            c.transform?.push({ prop: "translateX", value: 0 });
          });
        }}
      >
        Add transform
      </button>
    </EditSection>
  );
};
