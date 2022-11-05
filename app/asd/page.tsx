import { PrismaClient } from "@prisma/client";

export default async function Page({ params, searchParams }: any) {
  const template = await new PrismaClient().template.findUnique({ where: { id: "sfdsf" } });
  if (!template) return <div>No template with this id!</div>;

  return (
    <div>
      <p>{searchParams.id}</p>
      <p>{params.id}</p>
      <p>{template.name}</p>
      <p>{template.width}</p>
    </div>
  );
}
