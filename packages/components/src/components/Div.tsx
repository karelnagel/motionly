import { StyleAndClass } from "@motionly/base";
import { DivProps } from "@motionly/base";
import { useColor } from "../useColor";
import { Children } from "./Children";

export const defaultDivProps: DivProps = {
  comp: "div",
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  comps: [],
};

export const Div = ({
  bg,
  comps,
  style,
  className,
  isSequence,
}: DivProps & StyleAndClass) => {
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
      <Children comps={comps} isSequence={isSequence} />
    </div>
  );
};
