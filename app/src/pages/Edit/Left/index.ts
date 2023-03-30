import { add } from "./Add";
import { code } from "./Code";
import { general } from "./General";

export type Left = {
  icon: () => JSX.Element;
  title: string;
  component: () => JSX.Element;
};

export const left = {
  add,
  code,
  general,
};

export type LeftTab = keyof typeof left;
