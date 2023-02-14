import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Project } from "../../../../types";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../trpc";
import { prismaProjectToProject } from "../../../../helpers/projectToProject";
import { renderStill } from "../../../../lib/renderStill";

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

const tags = ["Projects"];
export const projects = createTRPCRouter({
  new: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/projects/new",
        protect: true,
        tags,
      },
    })
    .input(Project)
    .output(Project)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.project.create({
        data: {
          template: input.template as any,
          name: input.name,
          description: input.description,
          preview: input.preview,
          public: false,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
      return prismaProjectToProject(result, ctx.session.user.id);
    }),
  clone: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/projects/clone",
        protect: true,
        tags,
      },
    })
    .input(z.object({ id: z.string() }))
    .output(Project)
    .mutation(async ({ input, ctx }) => {
      const prevProject = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          OR: [{ public: true }, { userId: ctx.session.user.id }],
        },
      });
      if (!prevProject) throw new TRPCError({ code: "BAD_REQUEST" });
      const result = await ctx.prisma.project.create({
        data: {
          template: prevProject.template as any,
          name: prevProject.name + " (Copy)",
          description: prevProject.description,
          preview: prevProject.preview,
          public: false,
          user: { connect: { id: ctx.session.user.id } },
          cloneOf: { connect: { id: prevProject.id } },
        },
      });
      return prismaProjectToProject(result, ctx.session.user.id);
    }),
  get: publicProcedure
    .meta({ openapi: { method: "GET", path: "/projects/{id}", tags } })
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
    .meta({
      openapi: { method: "PUT", path: "/projects/{id}", protect: true, tags },
    })
    .input(z.object({ id: z.string(), project: Project }))
    .output(Project)
    .mutation(async ({ input: { id, project }, ctx }) => {
      await isOwner(id, ctx.session.user.id);
      const { url } = await renderStill(project.template, 10);
      const result = await ctx.prisma.project.update({
        where: { id },
        data: {
          name: project.name,
          public: project.public,
          description: project.description,
          template: project.template as any,
          preview: url || project.preview,
        },
        include: { user: true },
      });

      return prismaProjectToProject(result, ctx.session.user.id);
    }),
  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/projects/{id}",
        protect: true,
        tags,
      },
    })
    .input(z.object({ id: z.string() }))
    .output(Project)
    .mutation(async ({ input: { id }, ctx }) => {
      await isOwner(id, ctx.session.user.id);
      const result = await ctx.prisma.project.delete({
        where: { id },
      });

      return prismaProjectToProject(result, ctx.session.user.id);
    }),
});
