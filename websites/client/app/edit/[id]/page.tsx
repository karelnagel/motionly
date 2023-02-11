import { Login } from "../../../components/Login";
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
  if (!session?.user)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">Not logged in</p>
        <Login />
      </div>
    );

  const project = await getProject(id);
  if (!project) return <div>Template not found!</div>;
  if (!project.isOwner) return <div>{"You can't edit this template!"}</div>;
  return <ClientPageWrapper project={project} />;
}
