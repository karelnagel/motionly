import { Component } from "../../Component";
import { StyleAndClass } from "@asius/base";
import { MockupProps } from "@asius/base";
import { Iphone } from "./IPhone";

export const defaultMockupProps: MockupProps = {
  comp: "mockup",
  type: "iPhone",
  bg: "#fff",
  children: [],
};

export const Mockup = ({
  children,
  type,
  bg,
  ...props
}: MockupProps & StyleAndClass) => {
  const childs = children.map((child, index) => (
    <Component key={index} {...child} />
  ));
  if (type === "iPhone") return <Iphone bg={bg}>{childs}</Iphone>;
  return <div {...props}>{childs}</div>;
};
