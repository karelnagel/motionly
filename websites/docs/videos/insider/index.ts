import { TemplateType } from "@motionly/base";
import { tweet } from "./tweets";

export interface Input {
  type: string;
  label: string;
  value: any;
}
export interface Inputs {
  [key: string]: Input;
}

export const insider: {
  [key: string]: { inputs: Inputs; template: (...args: any) => TemplateType };
} = {
  tweet,
};
