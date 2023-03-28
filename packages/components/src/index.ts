import { z } from "zod";

export type Input = {
  id: string;
  type: "string" | "number" | "boolean" | "array" | "function" | "symbol" | "undefined" | "bigint" | "any";
};
export const StringInput = z.object({
  type: z.literal("string"),
  value: z.string(),
});

export type Component<T> = {
  id: string;
  type: string;
  component: (p: T) => JSX.Element;
  inputs: { [key in keyof T]: Input };
};

export const components: Component<any>[] = [];
