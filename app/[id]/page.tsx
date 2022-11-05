import { PrismaClient } from "@prisma/client";

export default async function Page({ params: { id } }: any) {
  const template = await new PrismaClient().template.findUnique({ where: { id } });
  if (!template) return <div>No template with this id!</div>;

  return (
    <div>
      <p>{id}</p>
      <p>{template.name}</p>
      <p>{template.width}</p>
      
    </div>
  );
}
