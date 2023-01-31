import { getServerSession } from "../../../../lib/getServerSession";
import { getTemplate } from "../../../../pages/api/templates/[id]";
import { Client } from "./Client";

export const dynamic = "force-dynamic";

export default async function Edit({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTemplate({ id });
  const session = await getServerSession();
  if (!template) return <div>Template not found!</div>;
  return <Client startTemplate={template} />;
}
