import { Project } from "../../../components/Template";
import { Title } from "../../../components/Title";
import { getServerSession } from "../../../lib/getServerSession";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession();
  const projects = await prisma.project.findMany({
    where: {
      userId: session?.user?.id || undefined,
    },
    include: { user: true },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="">
      <Title text="Your Projects" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {projects.map((template) => (
          <Project
            key={template.id}
            id={template.id}
            name={template.name}
            image={template.preview || undefined}
            isOwner={true}
            description={template.description}
          />
        ))}
      </div>
    </div>
  );
}
