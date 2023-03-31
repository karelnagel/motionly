import z from "zod";

type fn<T> = (set: (p: Partial<T>) => void, get: () => T) => T;

export function zustandZod<T extends {}>(fn: fn<T>, zod: z.ZodType<T>, callback: (e: z.ZodError) => void = () => {}): fn<T> {
  return (set, get) => {
    const newSet: typeof set = (p) => {
      console.log(p);
      if (!("partial" in zod) || typeof zod.partial !== "function") throw new Error("zod must be a partial schema");
      const res = zod.partial().safeParse(p);
      if (!res.success) return callback(res.error);
      return set(p);
    };
    return fn(newSet, get);
  };
}
