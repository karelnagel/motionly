import { renders } from "./routers/renders/renders";
import { projects } from "./routers/projects/projects";
import { createTRPCRouter } from "./trpc";
import { ai } from "./routers/ai/ai";
import { media } from "./routers/media/media";
import { transcriptions } from "./routers/transcriptions/transcriptions";
import { keys } from "./routers/keys/keys";
import { email } from "./routers/email/email";

export const appRouter = createTRPCRouter({
  projects,
  renders,
  ai,
  media,
  transcriptions,
  keys,
  email,
});

export type AppRouter = typeof appRouter;
