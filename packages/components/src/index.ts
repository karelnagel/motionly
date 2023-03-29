import { Inputs } from "@motionly/inputs";
import { z } from "zod";

export const StringInput = z.object({
  type: z.literal("string"),
  value: z.string(),
});

export type Component<T> = {
  type: string;
  zod: z.ZodType<T>;
  component: React.FC<T>;
  inputs: { [key in keyof T]: Inputs };
};
export const Component = z.enum(["image"]);
export const components: Record<string, Component<any>> = {};
