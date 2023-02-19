import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import { hashString } from "../../../../helpers/hash";

const tags = ["API Keys"];
const APIKey = z.object({
  hash: z.string(),
  name: z.string(),
  userId: z.string(),
});
export const keys = createTRPCRouter({
  new: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/keys/new",
        protect: true,
        tags,
      },
    })
    .input(z.object({ name: z.string().min(1) }))
    .output(z.object({ secret: z.string(), key: APIKey }))
    .mutation(async ({ input, ctx }) => {
      const secret = crypto.randomUUID();
      const hash = hashString(secret);
      const key = await ctx.prisma.apiKey.create({
        data: {
          name: input.name,
          hash,
          userId: ctx.session.user.id,
        },
      });
      return { secret, key };
    }),
  getAll: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/keys",
        protect: true,
        tags,
      },
    })
    .input(z.object({}))
    .output(z.object({ keys: z.array(APIKey) }))
    .query(async ({ ctx }) => {
      const keys = await ctx.prisma.apiKey.findMany({
        where: { userId: ctx.session.user.id },
      });
      return { keys };
    }),
  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/keys/{hash}",
        protect: true,
        tags,
      },
    })
    .input(z.object({ hash: z.string() }))
    .output(APIKey)
    .mutation(async ({ input: { hash }, ctx }) => {
      try {
        const key = await ctx.prisma.apiKey.delete({
          where: { hash },
        });
        return key;
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Key not found",
        });
      }
    }),
});
