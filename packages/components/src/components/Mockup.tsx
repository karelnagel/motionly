import { StyleAndClass } from "../types";
import { MockupProps } from "../types/components";

export const defaultMockupProps: MockupProps = {
  type: "mockup",
  mockupType: "iPhone",
  children: [],
};

export const Mockup = ({
  mockupType,
  ...props
}: MockupProps & StyleAndClass) => {
  return <div {...props}>No {mockupType} mockup yet!</div>;
};
