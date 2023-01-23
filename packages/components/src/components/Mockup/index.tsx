import { StyleAndClass } from "@asius/base";
import { MockupProps } from "@asius/base";
import { Iphone } from "./IPhone";
import { Children } from "../Children";

export const defaultMockupProps: MockupProps = {
  comp: "mockup",
  type: "iPhone",
  bg: "#fff",
  isSequence: true,
  children: [],
};

export const Mockup = ({
  children,
  type,
  bg,
  isSequence,
  ...props
}: MockupProps & StyleAndClass) => {
  const childs = <Children childs={children} isSequence={isSequence} />;

  if (type === "iPhone") return <Iphone bg={bg}>{childs}</Iphone>;
  return <div {...props}>{childs}</div>;
};
