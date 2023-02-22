import { getProject } from "../../../../lib/getProject";
import { Client } from "./Client";
import prisma from "../../../../server/db";
export const dynamic = "force-dynamic";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  if (!project) return <div>project not found!</div>;
  const renderCount = await prisma.render.aggregate({
    where: { projectId: project.id },
    _count: { _all: true },
  });

  return <Client startProject={project} renderCount={renderCount._count._all} />;
}
