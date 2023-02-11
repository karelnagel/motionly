import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Project } from "../../../types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prismaProjectToProject } from "../../../helpers/projectToProject";

const isOwner = async (id: string, userId: string) => {
  const prevProject = await prisma.project.findFirst({ where: { id } });
  if (!prevProject)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Project not found",
    });
  if (prevProject.userId !== userId)
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not the owner of this project!",
    });
};

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
      return prismaProjectToProject(result, ctx.session.user.id);
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
      return prismaProjectToProject(project, ctx.session?.user.id);
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), project: Project }))
    .output(Project)
    .mutation(async ({ input: { id, project }, ctx }) => {
      await isOwner(id, ctx.session.user.id);

      const result = await ctx.prisma.project.update({
        where: { id },
        data: {
          name: project.name,
          public: project.public,
          description: project.description,
          template: project.template as any,
          preview: project.preview,
        },
        include: { user: true },
      });

      return prismaProjectToProject(result, ctx.session.user.id);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      await isOwner(id, ctx.session.user.id);
      const result = await ctx.prisma.project.delete({
        where: { id },
      });

      return prismaProjectToProject(result, ctx.session.user.id);
    }),
});
