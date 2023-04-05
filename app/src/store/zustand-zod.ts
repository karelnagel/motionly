import z from "zod";
import { StoreApi } from "zustand";

export type set<T extends {}> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined, noCheck?: boolean) => void;
type get<T extends {}> = () => T;
type store<T extends {}> = StoreApi<T>;
type fn<T extends {}> = (set: set<T>, get: get<T>, store: store<T>) => T;

export function zustandZod<T extends {}>(fn: fn<T>, zod: z.ZodType<T>, callback: (e: z.ZodError) => void = () => {}): fn<T> {
  return (set, get, store) => {
    const newSet: typeof set = (p, replace, noCheck) => {
      if (noCheck) return set(p, replace);

      if (!("partial" in zod) || !(zod.partial instanceof Function)) throw new Error("zod must be a partial schema");
      const parse = p instanceof Function ? p(store.getState()) : p;
      const res = zod.partial().safeParse(parse);
      if (!res.success) return callback(res.error);
      return set(res.data, replace);
    };
    return fn(newSet, get, store);
  };
}
