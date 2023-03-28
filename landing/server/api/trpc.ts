import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { OpenApiMeta } from "trpc-openapi";

type CreateContextOptions = {};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {};
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};

import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createTRPCContext>()
  .create({
    errorFormatter({ shape }) {
      return shape;
    },
  });

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  return next({
    ctx: {},
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
