import { CSSProperties } from "react";
import { IoLockOpen } from "react-icons/io5";
import { z } from "zod";
import { WrapperType } from "..";
import { AnimationProps } from "./types";
import { useAnimation } from "./useAnimation";

const Animation = z.object({
  type: z.literal("animation"),
  animations: AnimationProps.array(),
});
type Animation = z.infer<typeof Animation>;

export const animation: WrapperType<Animation> = {
  zod: Animation,
  title: "Animations",
  icon: IoLockOpen,
  edit: ({ value, onChange }) => {
    return <div></div>;
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
