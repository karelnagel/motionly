import { getRandomId } from "../../../../helpers";
import { InputSchemaItem, InputType, ItemType, zodItemTypes } from "./types";

const getType = (value: any): ItemType => {
  const type = typeof value;
  if (type === "object" && Array.isArray(value)) {
    return "array";
  } else if (type === "object") {
    return "object";
  } else if (type === "bigint" || type === "symbol" || type === "function" || type === "undefined") {
    return "any";
  } else if (type === "string" && zodItemTypes.url.zod.safeParse(value).success) {
    return "url";
  } else if (type === "string" && zodItemTypes.color.zod.safeParse(value).success) {
    return "color";
  } else {
    return type;
  }
};

const getSchemaItem = (name: string, value: any): InputSchemaItem => {
  const type = getType(value);
  const id = getRandomId();
  if (type === "array") {
    const arrayType = getSchemaItem(name, value[0]);
    return { type: "array", id, name, arrayType };
  } else if (type === "object") {
    return { type, name, id, entries: getSchema(value) };
  } else {
    return { type, name, id };
  }
};

export const getSchema = (object: InputType): InputSchemaItem[] => {
  return Object.entries(object).map(([name, value]) => getSchemaItem(name, value));
};
