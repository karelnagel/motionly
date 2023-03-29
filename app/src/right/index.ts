import { code } from "../left/Code";
import { general } from "./General";

export type Right = {
  icon: () => JSX.Element;
  title: string;
  component: () => JSX.Element;
};

export const right = {
  general,
  code,
};

export type RightTab = keyof typeof right;
