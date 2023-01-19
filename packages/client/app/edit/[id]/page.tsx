import { Login } from "../../../components/Login";
import { getServerSession } from "../../../lib/getServerSession";
import { getTemplate } from "../../../pages/api/templates/[id]";
import { ClientPageWrapper } from "./ClientPage";

export const revalidate = 0;

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
  let template = await getTemplate({ id });
  if (id === "blank")
    template = {
      comps: [],
      duration: 10,
      fps: 30,
      height: 1080,
      width: 1080,
      description: "This is an empty template",
      name: "Empty Template",
      id: "blank",
      isOwner: false,
      public: false,
      background: "#FFFFFFFF",
    };
  if (!template) return <div>Template not found!</div>;
  if (!template.isOwner) return <div>{"You can't edit this template!"}</div>;
  return <ClientPageWrapper template={template} />;
}
