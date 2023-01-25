import { StyleAndClass } from "@motionly/base";
import { MockupProps } from "@motionly/base";
import { Iphone } from "./IPhone";
import { Children } from "../Children";

export const defaultMockupProps: MockupProps = {
  comp: "mockup",
  type: "iPhone",
  bg: "#fff",
  isSequence: true,
  comps: [],
};

export const Mockup = ({
  comps,
  type,
  bg,
  isSequence,
  ...props
}: MockupProps & StyleAndClass) => {
  const childs = <Children comps={comps} isSequence={isSequence} />;

  if (type === "iPhone") return <Iphone bg={bg}>{childs}</Iphone>;
  return <div {...props}>{childs}</div>;
};
