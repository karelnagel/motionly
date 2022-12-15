import { Template } from "../../components/Template";
import { Title } from "../../components/Title";
import { getServerSession } from "../../lib/getServerSession";
import { prisma } from "../../lib/prisma";

export default async function Page() {
  const session = await getServerSession();
  const templates = await prisma.template.findMany({
    where: {
      user: { email: session?.user?.email },
    },
    include: { user: true },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="">
      <Title text="Your Projects" />
      <div className="grid grid-cols-4 gap-4 mt-10">
        <Template id="blank" name="Start with empty project" image="/icons/add.webp" />
        {templates.map((template) => (
          <Template
            key={template.id}
            id={template.id}
            name={template.name}
            image={`https://picsum.photos/seed/${template.id}200/100`}
          />
        ))}
      </div>
    </div>
  );
}
