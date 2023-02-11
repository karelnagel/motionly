import { render } from "./routers/render";
import { projects } from "./routers/templates";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  projects,
  render,
});

export type AppRouter = typeof appRouter;
