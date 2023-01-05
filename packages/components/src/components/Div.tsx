import { Component } from "../Component";
import { StyleAndClass } from "../types";
import { DivProps } from "../types/components";

export const defaultDivProps: DivProps = {
  comp: "div",
  bg: "#FF0000FF",
  children: [],
};

export const Div = ({
  bg: background,
  children,
  style,
  className,
}: DivProps & StyleAndClass) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: background,
        ...style,
      }}
    >
      {children.map((child, index) => (
        <Component key={index} {...child} />
      ))}
    </div>
  );
};
