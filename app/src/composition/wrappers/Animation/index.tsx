import { CSSProperties, useState } from "react";
import { MdAnimation } from "react-icons/md";
import { z } from "zod";
import { DefineWrapper } from "..";
import { getRandomId } from "../../../helpers";
import { Inputs } from "../../../inputs";
import { AnimationProps, AnimationType, Easing, InterpolateProps, NoiseProps, SpringProps } from "./types";
import { useAnimation } from "./useAnimation";

const Animation = z.object({
  type: z.literal("animation"),
  animations: AnimationProps.array(),
});
type Animation = z.infer<typeof Animation>;
const spring: Inputs<SpringProps> = {
  stiffness: { number: { label: "Stiffness" } },
  damping: { number: { label: "Damping" } },
  mass: { number: { label: "Mass" } },
};
const interpolate: Inputs<InterpolateProps> = {
  easing: { select: { label: "Easing", zod: Easing } }, // Todo add easing options
};
const noise: Inputs<NoiseProps> = {
  speed: { number: { label: "Speed" } },
  seed: { number: { label: "Seed", placeholder: "Auto" } },
};
const animationProps: Inputs<AnimationProps> = {
  type: { select: { label: "Type", zod: AnimationType, colspan: 2 } },
  start: { number: { label: "Start" } },
  duration: { number: { label: "End" } },
  from: { number: { label: "From" } },
  to: { number: { label: "To" } },
};
const defaultAnimation: AnimationProps = {
  id: getRandomId(),
  prop: "translateX",
  type: "spring",
};
const EditAnimation = ({ value, onChange }: { value: AnimationProps; onChange: (v: Partial<AnimationProps>) => void }) => {
  const props = { spring, interpolate, noise }[value.type];
  return <Inputs cols={2} value={value} onChange={onChange} inputs={{ ...animationProps, ...props }} />;
};
export const animation: DefineWrapper<Animation> = {
  zod: Animation,
  title: "Animations",
  icon: MdAnimation,
  default: { type: "animation", animations: [] },
  edit: ({ value, onChange }) => {
    const [newProps, setNewProps] = useState<AnimationProps>({ id: getRandomId(), prop: "translateX", type: "spring" });
    return (
      <div>
        {value.animations.map((a) => (
          <EditAnimation key={a.id} value={a} onChange={(v) => onChange({ animations: value.animations.map((a2) => a2) })} /> // Todo
        ))}
        <button onClick={() => onChange({ animations: [...value.animations, defaultAnimation] })}>Add</button>
      </div>
    );
  },
  wrapper: ({ children, animations }) => {
    const animate = useAnimation();
    let style: CSSProperties = {};
    style.opacity = animations.filter((a) => a.prop === "opacity").reduce((acc, a) => acc * animate(a), 1);
    style.borderRadius = animations.filter((a) => a.prop === "borderRadius").reduce((acc, a) => acc + animate(a), 1);
    style.transform = animations
      .filter((a) => a.prop !== "opacity" && a.prop !== "borderRadius")
      .map((a) => `${a.prop}(${animate(a)}${"px"})`)
      .join(" ");

    return <div style={style}>{children}</div>;
  },
};
