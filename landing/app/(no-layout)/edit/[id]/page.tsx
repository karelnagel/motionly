import { Metadata } from "next";
import { redirect } from "next/navigation";
import { motionly, subTitle } from "../../../../consts";
import { getProject } from "../../../../lib/getProject";
import { getServerSession } from "../../../../lib/getServerSession";
import { PageProps } from "../../../../types";
import { ClientPageWrapper } from "./ClientPage";

export const dynamic = "force-dynamic";

export default async function Page({ params: { id } }: PageProps) {
  if (!id) return <div>Wrong id!</div>;
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login?redirect=/edit/" + id);
  }

  const project = await getProject(id);
  if (!project) return <div>Template not found!</div>;
  if (!project.isOwner) return <div>{"You can't edit this template!"}</div>;
  return <ClientPageWrapper project={project} />;
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
