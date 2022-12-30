import EditTemplate from "./EditTemplate";
import { getTemplate } from "../../../pages/api/templates/[id]";
import { defaultComponents } from "@asius/types";

export const revalidate = 1;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return <div>No id!</div>;
  let template = await getTemplate({ id });
  if (id === "blank")
    template = {
      comps: defaultComponents,
      duration: 60,
      fps: 30,
      height: 1080,
      width: 1080,
      description: "asdf",
      name: "name",
      id: "asdfdsf",
      isOwner: true,
      public: false,
    };
  if (!template) return <div>Template not found!</div>;
  return <EditTemplate template={template} />;
}
