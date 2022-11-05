import Edit from "./Edit";
import { PrismaClient } from "@prisma/client";

export default async function Page({ params: { id } }: any) {
  if (!id) return <div>No id!</div>;
  const template = await new PrismaClient().template.findUnique({ where: { id } });
  if (!template) return <div>No template with this id!</div>;

  return (
    <div>
      <Edit
        template={
          {
            width: template.width,
            height: template.height,
            elements: template.elements,
            id: template.id,
            name: template.name,
            description: template.description,
          } as any
        }
      />
    </div>
  );
}
