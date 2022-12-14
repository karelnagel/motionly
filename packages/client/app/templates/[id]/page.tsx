import Edit from "./Edit";
import { getTemplate } from "../../../pages/api/templates/[id]";

export const revalidate = 1;

export default async function Page({ params: { id } }: { params: { id: string } }) {
  if (!id) return <div>No id!</div>;
  const template = await getTemplate({ id });
  if (!template) return <div>No template!</div>;
  const { width, height, name, description, comps } = template;
  return (
    <div>
      <Edit
        template={
          {
            width,
            height,
            comps,
            id,
            name,
            description,
          } as any
        }
      />
    </div>
  );
}
