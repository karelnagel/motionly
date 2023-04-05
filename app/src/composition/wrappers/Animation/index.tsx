import { CSSProperties } from "react";
import { MdAnimation } from "react-icons/md";
import { z } from "zod";
import { DefineWrapper } from "..";
import { AnimationProps } from "./types";
import { useAnimation } from "./useAnimation";

const Animation = z.object({
  type: z.literal("animation"),
  animations: AnimationProps.array(),
});
type Animation = z.infer<typeof Animation>;

export const animation: DefineWrapper<Animation> = {
  zod: Animation,
  title: "Animations",
  icon: MdAnimation,
  default: { type: "animation", animations: [] },
  edit: ({ value, onChange }) => {
    return <div>{value.type}</div>;
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
