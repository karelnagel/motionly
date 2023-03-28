import { createTRPCRouter } from "./trpc";
import { email } from "./routers/email/email";

export const appRouter = createTRPCRouter({
  email,
});

export type AppRouter = typeof appRouter;
