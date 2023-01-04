import {
  AnimationProps,
  AnimationTypes,
  ComponentProps,
} from "@asius/components";
import {
  BooleanInput,
  NumberInput,
  SelectInput,
} from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

const defaultAnimation = {
  type: "scale",
  start: 0.1,
  end: 1,
  from: 0,
  to: 1,
  duration: 0,
  mass: 1,
  damping: 14,
  stiffness: 80,
  reverse: true,
};

export const EditAnimation = ({
  comp: { componentAnimations = [], ...comp },
  setComp,
}: {
  comp: ComponentProps;
  setComp: SetComp;
}) => {
  const setAnimation = (index: number, value: Partial<AnimationProps>) => {
    setComp({
      ...comp,
      componentAnimations: componentAnimations.map((a, i) => {
        if (i === index) {
          return { ...a, ...value };
        }
        return a;
      }),
    });
  };
  return (
    <EditSection title="Animation">
      <div className="col-span-2">
        {componentAnimations.map(
          (
            {
              type,
              damping,
              duration,
              end,
              from,
              mass,
              reverse,
              start,
              stiffness,
              to,
            },
            i
          ) => {
            return (
              <EditSection
                title={`animation ${i + 1} - ${type}`}
                key={i}
                level={1}
                className="col-span-2"
              >
                <SelectInput
                  label="type"
                  value={type}
                  onChange={(newType) =>
                    setAnimation(i, { type: newType || type })
                  }
                  options={Object.entries(AnimationTypes).map(
                    ([value, { label }]) => ({ value, label })
                  )}
                />
                <NumberInput
                  label="start"
                  value={start}
                  onChange={(start) => setAnimation(i, { start })}
                />
                <NumberInput
                  label="end"
                  value={end}
                  onChange={(end) => setAnimation(i, { end })}
                />
                <NumberInput
                  label="from"
                  value={from}
                  onChange={(from) => setAnimation(i, { from })}
                />
                <NumberInput
                  label="to"
                  value={to}
                  onChange={(to) => setAnimation(i, { to })}
                />
                <NumberInput
                  label="duration"
                  value={duration}
                  onChange={(duration) => setAnimation(i, { duration })}
                />
                <NumberInput
                  label="mass"
                  value={mass}
                  onChange={(mass) => setAnimation(i, { mass })}
                />
                <NumberInput
                  label="damping"
                  value={damping}
                  onChange={(damping) => setAnimation(i, { damping })}
                />
                <NumberInput
                  label="stiffness"
                  value={stiffness}
                  onChange={(stiffness) => setAnimation(i, { stiffness })}
                />
                <BooleanInput
                  label="reverse"
                  value={reverse}
                  onChange={(reverse) => setAnimation(i, { reverse })}
                />
                <button
                  onClick={() =>
                    setComp({
                      ...comp,
                      componentAnimations: componentAnimations.filter(
                        (_, index) => i !== index
                      ),
                    })
                  }
                >
                  Remove
                </button>
              </EditSection>
            );
          }
        )}
        <button
          onClick={() => {
            setComp({
              ...comp,
              componentAnimations: [...componentAnimations, defaultAnimation],
            });
          }}
        >
          Add
        </button>
      </div>
    </EditSection>
  );
};
