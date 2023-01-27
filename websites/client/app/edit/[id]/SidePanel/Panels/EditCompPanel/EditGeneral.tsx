import { ComponentProps, transformProps } from "@motionly/base";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
} from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditGeneral = ({
  comp,
  setComp,
}: {
  comp: ComponentProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection>
      <NumberInput
        label="X (px)"
        placeholder="0"
        value={comp.x}
        onChange={(x) => setComp({ ...comp, x })}
      />
      <NumberInput
        label="Y (px)"
        placeholder="0"
        value={comp.y}
        onChange={(y) => setComp({ ...comp, y })}
      />
      <NumberInput
        label="Width (px)"
        placeholder="MAX"
        value={comp.width}
        onChange={(width) => setComp({ ...comp, width })}
      />
      <NumberInput
        label="Height (px)"
        placeholder="MAX"
        value={comp.height}
        onChange={(height) => setComp({ ...comp, height })}
      />
      <NumberInput
        label="Border Radius (px)"
        value={comp.borderRadius}
        placeholder="0"
        onChange={(borderRadius) => setComp({ ...comp, borderRadius })}
      />
      <NumberInput
        label="Rotation (deg)"
        placeholder="0"
        value={comp.rotation}
        onChange={(rotation) => setComp({ ...comp, rotation })}
      />
      <NumberInput
        label="From (s)"
        tooltip
        placeholder="0"
        value={comp.from}
        onChange={(from) => setComp({ ...comp, from })}
      />
      <NumberInput
        label="Duration (s)"
        tooltip
        placeholder="MAX"
        value={comp.duration}
        onChange={(duration) => setComp({ ...comp, duration })}
      />
      <NumberInput
        label="Loop duration (s)"
        value={comp.loopDuration}
        onChange={(loopDuration) => setComp({ ...comp, loopDuration })}
      />
      <NumberInput
        label="Freeze (s)"
        value={comp.freeze}
        onChange={(freeze) => setComp({ ...comp, freeze })}
      />
      <BooleanInput
        label="Motion Blur"
        className="col-span-2"
        value={!!comp.motionBlur}
        onChange={(motionBlur) =>
          setComp({ ...comp, motionBlur: motionBlur ? {} : undefined })
        }
      />
      {"comps" in comp && (
        <BooleanInput
          label="Play in Sequence"
          className="col-span-2"
          value={comp.isSequence}
          onChange={(isSequence) => setComp({ ...comp, isSequence })}
        />
      )}
      {comp.motionBlur && (
        <>
          <NumberInput
            label="Motion Blur Lag (s)"
            value={comp.motionBlur.lag}
            placeholder="0.1"
            onChange={(lag) =>
              setComp({ ...comp, motionBlur: { ...comp.motionBlur, lag } })
            }
          />
          <NumberInput
            label="Motion Blur Layers"
            value={comp.motionBlur.layers}
            placeholder="50"
            onChange={(layers) =>
              setComp({ ...comp, motionBlur: { ...comp.motionBlur, layers } })
            }
          />
          <NumberInput
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
          <SelectInput
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
          <NumberInput
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
