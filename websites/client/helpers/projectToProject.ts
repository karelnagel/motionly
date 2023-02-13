import { Project } from "../types";
import { Project as PrismaProject } from "@prisma/client";

export const prismaProjectToProject = (
  project: PrismaProject,
  userId?: string
): Project => ({
  template: project.template as any,
  name: project.name,
  description: project.description,
  id: project.id,
  public: project.public,
  isOwner: project.userId === userId,
  preview: project.preview || undefined,
});
