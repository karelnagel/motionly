import { Component } from "../Component";
import { ComponentProps } from "../types";

export type DivProps= {
  type: "div";
  background?: string;
  children: ComponentProps[];
}

export const defaultDivProps: DivProps = {
  type: "div",
  background: "#FF0000FF",
  children: [],
};

export const Div = ({ background, children }: DivProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: background,
      }}
    >
      {children.map((child, index) => (
        <Component key={index} {...child} />
      ))}
    </div>
  );
};
