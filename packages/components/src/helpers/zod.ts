import { z } from "zod";

export const ObjectFit = z.enum(["cover", "contain", "fill", "none"]);
export type ObjectFit = z.infer<typeof ObjectFit>;