import { render } from "./routers/render";
import { projects } from "./routers/projects";
import { createTRPCRouter } from "./trpc";
import { stock } from "./routers/stock";
import { ai } from "./routers/ai";

export const appRouter = createTRPCRouter({
  projects,
  render,
  stock,
  ai,
});

export type AppRouter = typeof appRouter;
