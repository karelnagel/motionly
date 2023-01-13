import { getTemplate } from "../../../pages/api/templates/[id]";
import { ClientPage } from "./EditTemplate";

export const revalidate = 0;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return <div>No id!</div>;
  let template = await getTemplate({ id });
  if (id === "blank")
    template = {
      comps: [],
      duration: 60,
      fps: 30,
      height: 1080,
      width: 1080,
      description: "This is an empty template",
      name: "Blank",
      id: "blank",
      isOwner: false,
      public: false,
      background: "#FFFFFFFF",
    };
  if (!template) return <div>Template not found!</div>;
  return <ClientPage template={template} />;
}
