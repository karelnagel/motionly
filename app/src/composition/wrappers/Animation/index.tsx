import { CSSProperties, useState } from "react";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";
import { MdAnimation } from "react-icons/md";
import { z } from "zod";
import { DefineWrapper } from "..";
import { getRandomId } from "../../../helpers";
import { Inputs } from "../../../inputs";
import { AnimationProp, AnimationProps, AnimationType, Easing, InterpolateProps, NoiseProps, SpringProps } from "./types";
import { useAnimation } from "./useAnimation";

const Animation = z.object({
  type: z.literal("animation"),
  animations: AnimationProps.array(),
});
type Animation = z.infer<typeof Animation>;
const spring: Inputs<SpringProps> = {
  stiffness: { range: { label: "Stiffness", min: 1, max: 1000, step: 1, def: 100 } },
  damping: { range: { label: "Damping", min: 1, max: 100, step: 0.1, def: 10 } },
  mass: { range: { label: "Mass", min: 0, max: 2, step: 0.1, def: 1 } },
};
const interpolate: Inputs<InterpolateProps> = {
  easing: { select: { label: "Easing", zod: Easing } }, // Todo add easing options
};
const noise: Inputs<NoiseProps> = {
  speed: { number: { label: "Speed" } },
  seed: { text: { label: "Seed", placeholder: "Auto" } },
};
const animationProps: Inputs<AnimationProps> = {
  type: { select: { label: "Type", zod: AnimationType, colspan: 2 } },
  prop: { select: { label: "Prop", zod: AnimationProp, colspan: 2 } },
  start: { number: { label: "Start" } },
  duration: { number: { label: "End" } },
  from: { number: { label: "From" } },
  to: { number: { label: "To" } },
};
const defaultAnimation: AnimationProps = {
  id: getRandomId(),
  prop: "scale",
  type: "spring",
  start: 0,
  duration: 1,
  from: 0,
  to: 1,
};
const getUnits = (prop: AnimationProp) => {
  switch (prop) {
    case "scale":
      return "";
    case "rotate":
      return "deg";
    default:
      return "px";
  }
};
const EditAnimation = ({
  value,
  onChange,
  remove,
}: {
  value: AnimationProps;
  onChange: (v: Partial<AnimationProps>) => void;
  remove: () => void;
}) => {
  const props = { spring, interpolate, noise }[value.type];
  const [show, setShow] = useState(false);
  return (
    <div className="bg-base-300 rounded-md p-2 space-y-2">
      <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
        <div className="flex items-center space-x-2">
          <IoIosClose className="text-2xl text-red-500" onClick={remove} />
          <p>{value.id}</p>
        </div>
        <IoIosArrowForward className="duration-150" style={{ transform: `rotate(${show ? 90 : 0}deg)` }} />
      </div>
      {show && <Inputs cols={2} value={value} onChange={onChange} inputs={{ ...animationProps, ...props }} />}
    </div>
  );
};

export const animation: DefineWrapper<Animation> = {
  zod: Animation,
  title: "Animations",
  icon: MdAnimation,
  default: { type: "animation", animations: [] },
  edit: ({ value, onChange }) => {
    return (
      <div className="space-y-2">
        {value.animations.map((anim) => (
          <EditAnimation
            key={anim.id}
            value={anim}
            remove={() => onChange({ animations: value.animations.filter((a) => a.id !== anim.id) })}
            onChange={(v) => {
              const animations = value.animations.map((a) => (a.id === anim.id ? { ...anim, ...v } : a));
              onChange({ animations });
            }}
          />
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
      .map((a) => `${a.prop}(${animate(a)}${getUnits(a.prop)})`)
      .join(" ");
    return (
      <div id="animations" style={style}>
        {children}
      </div>
    );
  },
};
