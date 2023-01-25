import { StyleAndClass } from "@motionly/base";
import { DivProps } from "@motionly/base";
import { useColors } from "../useColors";
import { Children } from "./Children";

export const defaultDivProps: DivProps = {
  comp: "div",
  bg: "#00000000",
  comps: [],
};

export const Div = ({
  bg: background,
  comps,
  style,
  className,
  isSequence,
}: DivProps & StyleAndClass) => {
  const color = useColors();
  return (
    <div
      className={className}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background: color(background),
        ...style,
      }}
    >
      <Children comps={comps} isSequence={isSequence} />
    </div>
  );
};
