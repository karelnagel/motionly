import { Component } from "../Component";
import { StyleAndClass } from "../types";
import { MockupProps } from "../types/components";

export const defaultMockupProps: MockupProps = {
  comp: "mockup",
  type: "iPhone",
  children: [],
};

export const Mockup = ({ children, ...props }: MockupProps & StyleAndClass) => {
  return (
    <div {...props}>
      {children.map((child, index) => (
        <Component key={index} {...child} />
      ))}
    </div>
  );
};
