import Edit from "./Edit";
import Test from "./Test";
import { prisma } from "../../../prisma/client";

export const revalidate = 1;

export default async function Page({ params: { id } }: any) {
  if (!id) return <div>No id!</div>;
  const template = await prisma.template.findUnique({ where: { id } });
  if (!template) return <div>No template with this id!</div>;
  const { width, height, name, description, elements } = template;
  return (
    <div>
      <Edit
        template={
          {
            width,
            height,
            elements,
            id,
            name,
            description,
          } as any
        }
      />
      <Test elements={elements} id={id} />
    </div>
  );
}
