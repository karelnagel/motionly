import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Draft } from "immer/dist/internal";
import { persist } from "zustand/middleware";
import { zustandZod } from "./zustand-zod";
import z from "zod";
import { toast } from "sonner";

export * from "./left";
export * from "./right";
export * from "./player";
export * from "./timeline";
export * from "./template";

export function storeBase<T extends {}>(
  state: (set: (state: T | Partial<T> | ((state: Draft<T>) => void)) => void, get: () => T) => T,
  zod: z.ZodType<T>,
  name: string
) {
  return create(
    persist(
      zustandZod(
        immer<T>((set, get) => state(set, get)),
        zod,
        (error) => error.errors.map((e) => toast.error(`${e.path.pop()}: ${e.message}`))
      ),
      { name }
    )
  );
}
