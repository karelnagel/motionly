import { StyleAndClass } from "../types";
import { MockupProps } from "../types/components";

export const defaultMockupProps: MockupProps = {
  comp: "mockup",
  type: "iPhone",
  children: [],
};

export const Mockup = ({ type, ...props }: MockupProps & StyleAndClass) => {
  return <div {...props}>No {type} mockup yet!</div>;
};
