import { z } from "zod";
import { number } from "./Number";
import { range } from "./Range";
import { text } from "./Text";
import { checkbox } from "./Checkbox";
import { color } from "./Color";
import { gif } from "./Gif";
import { image } from "./Image";
import { json } from "./Json";
import { select } from "./Select";
import { textarea } from "./Textarea";
import { video } from "./Video";
import { text_style } from "./TextStyle";

export * from "./Select/options";
export { Color } from "./Color";
export { TextStyle } from "./TextStyle";

export type InputProps<T> = {
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  disabled?: boolean;
};
export type DefaultProps = {
  label: string;
  tooltip?: string;
  placeholder?: string;
};

export type Input<Value, Props = {}> = {
  component: React.FC<InputProps<Value | undefined> & { props: Props & DefaultProps }>;
  zod: z.ZodType<Value | undefined> | ((props: Props) => z.ZodType<Value | undefined>);
};

export const inputs = {
  text,
  number,
  range,
  checkbox,
  color,
  gif,
  image,
  json,
  select,
  textarea,
  video,
  text_style,
};
type keys = keyof typeof inputs;
type Params<T extends keys> = Parameters<(typeof inputs)[T]["component"]>[0]["props"];

export type InputsEasy = { [key in keys]?: Params<key> };

export type Inputs = {
  [P in keys]: Record<P, Params<P>> & Partial<Record<Exclude<keys, P>, never>> extends infer O ? { [Q in keyof O]: O[Q] } : never;
}[keys];

export function Input<T>({ props, value, onChange }: { props: Inputs; value: T; onChange: (s: T) => void }) {
  const entries = Object.entries(props);
  if (entries.length !== 1) return null;
  const entry = entries[0];
  const Component = inputs[entry[0] as keys].component;
  return <Component onChange={onChange as any} value={value as any} props={entry[1] as any} />;
}
