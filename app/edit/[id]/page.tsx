import Edit from "./Edit";
import { PrismaClient } from "@prisma/client";
import Test from "./Test";

export const revalidate = 1;

export default async function Page({ params: { id } }: any) {
  if (!id) return <div>No id!</div>;
  const template = await new PrismaClient().template.findUnique({ where: { id } });
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
