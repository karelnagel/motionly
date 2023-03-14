"use client";

import { useState } from "react";
import { z } from "zod";
const SimpleType = z.enum(["string", "number", "boolean", "url", "any", "color"]);
type SimpleType = z.infer<typeof SimpleType>;

const Type = z.union([SimpleType, z.enum(["object", "array"])]);
type Type = z.infer<typeof Type>;

type Input =
  | {
      name: string;
      optional?: boolean;
    } & (
      | {
          type: "array";
          arrayType: Input;
        }
      | {
          type: "object";
          entries: Input[];
        }
      | { type: SimpleType }
    );

const zodTypes: { [type in SimpleType]: { type: Type; zod: z.ZodType } } = {
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

const object = {
  name: "Hello",
  colors: ["#ddd", "#fff"],
  person: {
    name: "John",
    age: 20,
  },
  friends: [
    { name: "John", age: 20 },
    { name: "John", age: 20 },
  ],
  link: "https://google.com",
};

const getType = (value: any): Type => {
  const type = typeof value;
  if (type === "object" && Array.isArray(value)) {
    return "array";
  } else if (type === "object") {
    return "object";
  } else if (type === "bigint" || type === "symbol" || type === "function" || type === "undefined") {
    return "any";
  } else if (type === "string" && zodTypes.url.zod.safeParse(value).success) {
    return "url";
  } else if (type === "string" && zodTypes.color.zod.safeParse(value).success) {
    return "color";
  } else {
    return type;
  }
};

type Obj = { [name: string]: any };

const parseOne = (name: string, value: any): Input => {
  const type = getType(value);
  if (type === "array") {
    const arrayType = parseOne(name, value[0]);
    return { type: "array", name, arrayType };
  } else if (type === "object") {
    return { type, name, entries: parseObject(value) };
  } else {
    return { type, name };
  }
};

const parseObject = (object: Obj): Input[] => {
  return Object.entries(object).map(([name, value]) => parseOne(name, value));
};

const inputs = parseObject(object);

const getOneInput = (input: Input): z.ZodType => {
  let type: z.ZodType;
  if (input.type === "array") type = z.array(getOneInput(input.arrayType));
  else if (input.type === "object") type = getSchema(input.entries);
  else type = zodTypes[input.type].zod;

  if (input.optional) type = type.optional();

  return type;
};

const getSchema = (inputs: Input[]): z.ZodType => {
  const schema = z.object(
    inputs.reduce((acc: any, input) => {
      acc[input.name] = getOneInput(input);
      return acc;
    }, {})
  );
  console.log(schema.shape.person);
  return schema;
};

export default function New() {
  const [text, setText] = useState("");
  const [json, setJson] = useState<{ [key: string]: any }>({});
  const schema = getSchema(inputs);
  const res = schema.safeParse(json);
  return (
    <div className="flex flex-col">
      <textarea value={JSON.stringify(object, null, 2)} readOnly className="h-40 m-2" />
      <textarea value={JSON.stringify(inputs, null, 2)} readOnly className="h-40 m-2" />

      <textarea
        className="h-40 m-2"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            setJson(JSON.parse(e.target.value));
          } catch (e) {
            setJson({});
          }
        }}
      />
      <div>
        {res.success
          ? "success"
          : res.error.errors.map((e) => (
              <p>
                Error with <span className="italic">{e.path.join(" -> ")}</span>: {e.message}
              </p>
            ))}
      </div>
    </div>
  );
}
