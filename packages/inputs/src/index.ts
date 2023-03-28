import { z } from "zod";
import { number } from "./Number";
import { range } from "./Range";
import { text } from "./Text";

export type InputProps<T> = {
  value: T;
  onChange: (value: T) => void;
  label: string;
};
export type Input<V, T extends InputProps<V | undefined> = InputProps<V | undefined>> = {
  type: string;
  component: React.FC<T>;
  zod: z.ZodType;
};

export const InputType = z.enum(["text", "number", "range"]);
export type InputType = z.infer<typeof InputType>;

export const inputs: { [key in InputType]: Input<any, any> } = {
  text,
  number,
  range,
};
