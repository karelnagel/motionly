import { redirect } from "next/navigation";
import { getProject } from "../../../lib/getProject";
import { getServerSession } from "../../../lib/getServerSession";
import { ClientPageWrapper } from "./ClientPage";

export const dynamic = "force-dynamic";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return <div>Wrong id!</div>;
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login?redirect=/edit/" + id);
    return;
  }

  const project = await getProject(id);
  if (!project) return <div>Template not found!</div>;
  if (!project.isOwner) return <div>{"You can't edit this template!"}</div>;
  return <ClientPageWrapper project={project} />;
}
