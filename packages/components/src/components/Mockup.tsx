import { ComponentProps, StyleAndClass } from "../types";

export const MockupTypes = {
  iPhone: "iPhone",
  chrome: "Chrome",
  macbook: "Macbook",
  iPad: "iPad",
  "apple-watch": "Apple Watch",
  "vs-code": "VS Code",
};
export type MockupProps = {
  type: "mockup";
  children: ComponentProps[];
  mockupType: keyof typeof MockupTypes;
};

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
