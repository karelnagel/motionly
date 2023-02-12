import { render } from "./routers/render";
import { projects } from "./routers/projects";
import { createTRPCRouter } from "./trpc";
import { stock } from "./routers/stock";
import { ai } from "./routers/ai";
import { media } from "./routers/media";

export const appRouter = createTRPCRouter({
  projects,
  render,
  stock,
  ai,
  media,
});

export type AppRouter = typeof appRouter;
