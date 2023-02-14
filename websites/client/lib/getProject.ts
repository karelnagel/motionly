import { Project } from "../types";
import { getServerSession } from "./getServerSession";

export const getProject = async (id: string) => {
  const session = await getServerSession();

  const template = await prisma?.project.findFirst({
    where: { id, OR: [{ public: true }, { userId: session?.user.id }] },
  });
  if (!template) return;

  const project: Project = {
    id: template.id,
    name: template.name,
    description: template.description,
    public: template.public,
    isOwner: template.userId === session?.user?.id,
    preview: template.preview ,
    template: template.template as any,
  };
  return project;
};
