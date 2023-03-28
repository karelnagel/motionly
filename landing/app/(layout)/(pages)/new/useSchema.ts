import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getSchema } from "./getSchema";
import { InputSchema, InputSchemaItem, InputType } from "./types";

export type SchemaStoreType = {
  input: InputType;
  setInput: (input: InputType) => void;
  schema?: InputSchema;
  inputToSchema: () => void;
  setSchema: (schema?: InputSchema) => void;
  setSchemaItem: (item: InputSchemaItem) => void;
};

export const useSchema = create(
  persist(
    immer<SchemaStoreType>((set, get) => ({
      input: {},
      setInput: (input) =>
        set((state) => {
          state.input = input;
        }),
      inputToSchema: () =>
        set((s) => {
          s.schema = getSchema(s.input);
        }),

      setSchema: (schema) =>
        set((state) => {
          state.schema = schema;
        }),
      setSchemaItem: (item) =>
        set((s) => {
          s.schema = s.schema?.map((i) => (i.id === item.id ? item : i));
        }),
    })),
    { name: "schema" }
  )
);
