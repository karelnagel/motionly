import { Project } from "../types";
import { Project as PrismaProject } from "@prisma/client";

export const prismaProjectToProject = (
  project: PrismaProject,
  userId?: string
): Project => ({
  ...project,
  template: project.template as any,
  isOwner: project.userId === userId,
});
