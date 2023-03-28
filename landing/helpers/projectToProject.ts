import { Project } from "../types";
import { Project as PrismaProject } from "@prisma/client";

export const prismaProjectToProject = (
  project: PrismaProject,
  userId?: string
): Project => ({
  description: project.description,
  id: project.id,
  name: project.name,
  public: project.public,
  tags: project.tags,
  preview: project.preview || undefined,
  template: project.template as any,
  isOwner: project.userId === userId,
});
