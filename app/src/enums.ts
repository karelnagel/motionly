import { z } from "zod";

export const Page = z.enum(["home", "edit", "render"]);
export type Page = z.infer<typeof Page>;
