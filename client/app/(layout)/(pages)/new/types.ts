import { z } from "zod";
export const BaseItemType = z.enum(["string", "number", "boolean", "url", "any", "color"]);
export type BaseItemType = z.infer<typeof BaseItemType>;

export const ItemType = z.enum([...BaseItemType.options, "object", "array"]);
export type ItemType = z.infer<typeof ItemType>;
export type InputType = { [name: string]: any };

export type InputSchemaItem =
  | {
      id: string;
      name: string;
      optional?: boolean;
    } & (
      | {
          type: "array";
          arrayType: InputSchemaItem;
        }
      | {
          type: "object";
          entries: InputSchemaItem[];
        }
      | { type: BaseItemType }
    );

export type InputSchema = InputSchemaItem[];
export const zodItemTypes: { [type in BaseItemType]: { type: ItemType; zod: z.ZodType } } = {
  color: {
    type: "color",
    zod: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  },
  url: {
    type: "url",
    zod: z.string().url().startsWith("http"),
  },
  string: {
    type: "string",
    zod: z.string(),
  },
  number: {
    type: "number",
    zod: z.number(),
  },
  boolean: {
    type: "boolean",
    zod: z.boolean(),
  },
  any: {
    type: "any",
    zod: z.any(),
  },
};
