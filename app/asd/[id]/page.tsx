import { PrismaClient } from "@prisma/client";

export default async function Page({ params: { id } }: any) {
  const templates = await new PrismaClient().template.findMany();

  if (!templates || templates.length > 0) return <div>No template with this id!</div>;

  return (
    <div>
      <p>{id}</p>
      <p>{templates[0].name}</p>
      <p>{templates[0].width}</p>
    </div>
  );
}
