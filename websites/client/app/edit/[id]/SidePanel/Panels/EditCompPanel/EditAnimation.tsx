import {
  animationProps,
  AnimationProps,
  animationTypes,
  EasingTypes,
} from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { getAnimationColor } from "../../../../../../helpers/color";
import { useComponent, useStore } from "../../../../../../hooks/useStore";

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

export const EditAnimation = ({}: {}) => {
  const comp = useComponent();
  const setComp = useStore((t) => t.setComp);
  const animations = comp.animations || [];
return null;
  // return (
  //   <div>
  //     {animations.map((animation, i) => (
  //       <OneAnimation
  //         key={i}
  //         animation={animation}
  //         i={i}
  //         remove={() =>
  //           setComp({
  //             ...comp,
  //             animations: animations.filter((_, j) => j !== i),
  //           })
  //         }
  //       />
  //     ))}
  //     <button
  //       className="btn btn-primary btn-block btn-sm"
  //       onClick={() =>
  //         setComp({ ...comp, animations: [...animations, defaultAnimation] })
  //       }
  //     >
  //       Add new
  //     </button>
  //   </div>
  // );
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
  const units = animationProps[animation.prop].units;
  return (
    <div className="mb-4 space-y-2">
      <div className="flex justify-between">
        <p className="font-bold">Animation {i + 1}</p>
        <button onClick={remove} className="btn btn-xs btn-error">
          Remove
        </button>
      </div>
      <div
        style={{ background: getAnimationColor(animation) }}
        className="h-[3px] rounded-full"
      />
      <div className="grid grid-cols-4 gap-2">
        <Input
          type="select"
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
        <Input
          type="select"
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
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          label="Start (s)"
          onChange={(start) => setAnimation(i, { start })}
          value={animation.start}
        />
        <Input
          type="number"
          label="Duration (s)"
          placeholder="MAX"
          onChange={(duration) => setAnimation(i, { duration })}
          value={animation.duration}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          label={`From ${units ? `(${units})` : ""}`}
          onChange={(from) => setAnimation(i, { from })}
          value={animation.from}
        />
        <Input
          type="number"
          label={`To ${units ? `(${units})` : ""}`}
          onChange={(to) => setAnimation(i, { to })}
          value={animation.to}
        />
      </div>

      {animation.type === "spring" && (
        <div className="grid grid-cols-3 gap-2">
          <Input
            type="number"
            label="Mass"
            onChange={(mass) => setAnimation(i, { mass })}
            value={animation.mass}
          />

          <Input
            type="number"
            label="Damping"
            onChange={(damping) => setAnimation(i, { damping })}
            value={animation.damping}
          />

          <Input
            type="number"
            label="Stiffness"
            onChange={(stiffness) => setAnimation(i, { stiffness })}
            value={animation.stiffness}
          />
        </div>
      )}
      {animation.type === "noise" && (
        <Input
          type="number"
          label="Speed"
          onChange={(speed) => setAnimation(i, { speed })}
          value={animation.speed}
        />
      )}
      {animation.type === "interpolate" && (
        <Input
          type="number"
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
      {(animation.prop === "text" || animation.prop === "number") && (
        <Input
          type="text"
          label="Variable"
          onChange={(variable) => setAnimation(i, { variable })}
          value={animation.variable}
        />
      )}
      {animation.prop === "text" && (
        <Input
          type="text"
          label="Value"
          onChange={(value) => setAnimation(i, { value })}
          value={animation.value}
        />
      )}
    </div>
  );
};
