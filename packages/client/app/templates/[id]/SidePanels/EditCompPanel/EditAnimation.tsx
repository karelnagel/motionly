import {
  animationProps,
  AnimationProps,
  animationTypes,
  ComponentProps,
  EasingTypes,
} from "@asius/components";
import { NumberInput, SelectInput } from "../../../../../components/inputs";
import { SetComp } from "./index";

const defaultAnimation: AnimationProps = {
  prop: "scale",
  type: "spring",
  start: 0.1,
  from: 0,
  to: 1,
  duration: 0,
  mass: 1,
  damping: 14,
  stiffness: 80,
};

export const EditAnimation = ({
  comp: { animations = [], ...comp },
  setComp,
}: {
  comp: ComponentProps;
  setComp: SetComp;
}) => {
  const setAnimation = (index: number, value: Partial<AnimationProps>) => {
    setComp({
      ...comp,
      animations: animations.map((a, i) => {
        if (i === index) {
          return { ...a, ...value } as AnimationProps;
        }
        return a;
      }),
    });
  };
  return (
    <div>
      {animations.map((animation, i) => (
        <OneAnimation
          key={i}
          animation={animation}
          i={i}
          setAnimation={setAnimation}
          remove={() =>
            setComp({
              ...comp,
              animations: animations.filter((_, j) => j !== i),
            })
          }
        />
      ))}
      <button
        className=""
        onClick={() =>
          setComp({ ...comp, animations: [...animations, defaultAnimation] })
        }
      >
        Add
      </button>
    </div>
  );
};
const OneAnimation = ({
  animation,
  i,
  setAnimation,
  remove,
}: {
  animation: AnimationProps;
  i: number;
  setAnimation: (i: number, value: Partial<AnimationProps>) => void;
  remove: () => void;
}) => {
  return (
    <div className="mb-4 space-y-1">
      <div className="flex justify-between">
        <p>Animation {i + 1}</p>
        <button onClick={remove} className="text-error">
          Remove
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <SelectInput
          label="Prop"
          value={animation.prop}
          onChange={(prop) =>
            setAnimation(i, {
              prop: prop as keyof typeof animationProps,
            })
          }
          options={Object.entries(animationProps).map(([value, { label }]) => ({
            value,
            label,
          }))}
        />
        <SelectInput
          label="Type"
          value={animation.type}
          onChange={(type) =>
            setAnimation(i, {
              type: type as keyof typeof animationTypes,
            })
          }
          options={Object.entries(animationTypes).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <NumberInput
          label="Start"
          onChange={(start) => setAnimation(i, { start })}
          value={animation.start}
        />
        <NumberInput
          label="Duration"
          onChange={(duration) => setAnimation(i, { duration })}
          value={animation.duration}
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <NumberInput
          label="From"
          onChange={(from) => setAnimation(i, { from })}
          value={animation.from}
        />
        <NumberInput
          label="To"
          onChange={(to) => setAnimation(i, { to })}
          value={animation.to}
        />
      </div>

      {animation.type === "spring" && (
        <div className="grid grid-cols-3 gap-1">
          <NumberInput
            label="Mass"
            onChange={(mass) => setAnimation(i, { mass })}
            value={animation.mass}
          />
          <NumberInput
            label="Damping"
            onChange={(damping) => setAnimation(i, { damping })}
            value={animation.damping}
          />
          <NumberInput
            label="Stiffness"
            onChange={(stiffness) => setAnimation(i, { stiffness })}
            value={animation.stiffness}
          />
        </div>
      )}
      {animation.type === "noise" && (
        <NumberInput
          label="Speed"
          onChange={(speed) => setAnimation(i, { speed })}
          value={animation.speed}
        />
      )}
      {animation.type === "interpolate" && (
        <SelectInput
          label="Easing"
          onChange={(easing) =>
            setAnimation(i, { easing: easing as keyof typeof EasingTypes })
          }
          value={animation.easing}
          options={Object.entries(EasingTypes).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      )}
    </div>
  );
};
