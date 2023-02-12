import { render } from "./routers/render";
import { projects } from "./routers/projects";
import { createTRPCRouter } from "./trpc";
import { stock } from "./routers/stock";

export const appRouter = createTRPCRouter({
  projects,
  render,
  stock,
});

export type AppRouter = typeof appRouter;
