import { getServerSession } from "../../../../lib/getServerSession";
import { getProject } from "../../../../pages/api/templates/[id]";
import { Client } from "./Client";

export const dynamic = "force-dynamic";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getProject({ id });
  const session = await getServerSession();
  if (!template) return <div>Template not found!</div>;
  return <Client startProject={template} />;
}
