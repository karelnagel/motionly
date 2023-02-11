import { getProject } from "../../../../lib/getProject";
import { Client } from "./Client";

export const dynamic = "force-dynamic";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);
  if (!project) return <div>project not found!</div>;
  return <Client startProject={project} />;
}
