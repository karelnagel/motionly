import { z } from "zod";
import { InputSchema, InputSchemaItem, zodItemTypes } from "./types";

const getItemZod = (input: InputSchemaItem): z.ZodType => {
  let type: z.ZodType;
  if (input.type === "array") type = z.array(getItemZod(input.arrayType));
  else if (input.type === "object") type = getZod(input.entries);
  else type = zodItemTypes[input.type].zod;

  if (input.optional) type = type.optional();

  return type;
};

export const getZod = (inputs: InputSchema): z.ZodType => {
  const schema = z.object(
    inputs.reduce((acc: any, input) => {
      acc[input.name] = getItemZod(input);
      return acc;
    }, {})
  );
  return schema;
};
export const safeParse = (inputs: InputSchema, object: any) => {
  const schema = getZod(inputs);
  return schema.safeParse(object);
};
