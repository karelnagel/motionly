import { projects } from "./routers/templates";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  projects,
  
});

export type AppRouter = typeof appRouter;
