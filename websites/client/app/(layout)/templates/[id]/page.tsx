import { getProject } from "../../../../lib/getProject";
import { Client } from "./Client";
import prisma from "../../../../server/db";
import { Metadata } from "next";
import { motionly, subTitle } from "../../../../consts";
import { PageProps } from "../../../../types";
export const dynamic = "force-dynamic";

export default async function Edit({ params: { id } }: PageProps) {
  const project = await getProject(id);

  if (!project) return <div>project not found!</div>;
  const renderCount = await prisma.render.aggregate({
    where: { projectId: project.id },
    _count: { _all: true },
  });

  return (
    <Client startProject={project} renderCount={renderCount._count._all} />
  );
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const project = await getProject(id);
  if (!project) return {};
  const title = subTitle(project?.name);
  const description = project?.description;
  return {
    title: title,
    description: project?.description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: project?.preview || motionly,
        },
      ],
    },
  };
}
