import { z } from "zod";
import { Project } from "../../../types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const templates = createTRPCRouter({
  new: protectedProcedure
    .input(Project)
    .output(Project)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.project.create({
        data: {
          template: input.template as any,
          name: input.name + " (Copy)",
          description: input.description,
          preview: input.preview,
          public: false,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
      return {
        ...result,
        preview: result.preview || undefined,
      };
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.id}`,
      };
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.id}`,
      };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.id}`,
      };
    }),
});
