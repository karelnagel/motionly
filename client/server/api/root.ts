import { renders } from "./routers/renders/renders";
import { projects } from "./routers/projects/projects";
import { createTRPCRouter } from "./trpc";
import { media } from "./routers/media/media";
import { transcriptions } from "./routers/transcriptions/transcriptions";
import { keys } from "./routers/keys/keys";
import { email } from "./routers/email/email";

export const appRouter = createTRPCRouter({
  projects,
  renders,
  media,
  transcriptions,
  keys,
  email,
});

export type AppRouter = typeof appRouter;
