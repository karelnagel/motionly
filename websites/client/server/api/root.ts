import { templates } from "./routers/templates";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  templates,
});

export type AppRouter = typeof appRouter;
