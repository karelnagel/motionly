import { StyleAndClass } from "@motionly/base";
import { DivProps } from "@motionly/base";
import { useColor } from "../helpers/useColor";

export const defaultDivProps: DivProps = {
  comp: "div",
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  childIds: [],
};

export const Div = ({ bg, style, className, comps }: DivProps & StyleAndClass) => {
  const background = useColor(bg);
  return (
    <div
      className={className}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background,
        ...style,
      }}
    >
      {comps}
    </div>
  );
};
