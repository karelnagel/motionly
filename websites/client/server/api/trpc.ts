import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db";
import { OpenApiMeta } from "trpc-openapi";
import crypto from "crypto";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const key = req.headers["x-api-key"] as string;
  if (key) {
    const hash = crypto.createHash("md5").update(key).digest("hex");
    const apiKey = await prisma.apiKey.findUnique({
      where: { hash },
      include: { user: true },
    });
    return createInnerTRPCContext({
      session: apiKey ? { user: apiKey.user, expires: "never" } : null,
    });
  } else {
    const session = await getServerAuthSession({ req, res });
    return createInnerTRPCContext({
      session,
    });
  }
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
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
