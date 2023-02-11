import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Project } from "../../../types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projects = createTRPCRouter({
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
    .output(Project)
    .query(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          OR: [{ public: true }, { user: { email: ctx.session?.user?.email } }],
        },
        include: { user: true },
      });
      if (!project)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project not found",
        });
      const isOwner = ctx.session?.user?.email === project.user.email;
      return {
        template: project.template,
        name: project.name,
        description: project.description,
        id: project.id,
        public: project.public,
        isOwner,
        preview: project.preview || undefined,
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
