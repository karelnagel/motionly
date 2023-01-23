import { Component } from "../Component";
import { StyleAndClass } from "@asius/base";
import { DivProps } from "@asius/base";
import { useColors } from "../useColors";

export const defaultDivProps: DivProps = {
  comp: "div",
  bg: "#00000000",
  children: [],
};

export const Div = ({
  bg: background,
  children,
  style,
  className,
}: DivProps & StyleAndClass) => {
  const color = useColors();
  return (
    <div
      className={className}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: color(background),
        ...style,
      }}
    >
      {children.map((child, index) => (
        <Component key={index} {...child} />
      ))}
    </div>
  );
};
