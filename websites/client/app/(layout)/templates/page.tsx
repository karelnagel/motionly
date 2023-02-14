import { SearchBar } from "../../../components/SearchBar";
import { Project } from "../../../components/Project";
import { getServerSession } from "../../../lib/getServerSession";
import { Clone } from "../../../components/Clone";

export const dynamic = "force-dynamic";

export default async function Templates({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const session = await getServerSession();
  const search = searchParams?.search || "";
  const comp = searchParams?.comp || "";
  const templates = await prisma.project.findMany({
    where: {
      public: true,
      AND: [
        {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        },
        { template: { string_contains: comp } }, // Todo make more specific
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  const yourProjects = session
    ? await prisma.project.findMany({
        where: {
          userId: session.user.id,
        },
        include: { user: true },
        orderBy: { updatedAt: "desc" },
      })
    : undefined;
  return (
    <div className="space-y-10 py-10">
      {yourProjects && (
        <div>
          <div className="flex flex-col text-center md:flex-row space-y-4 md:space-y-0 justify-between items-center">
            <p className="text-5xl font-bold title">Your projects</p>
            <Clone className="btn">create new</Clone>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {yourProjects.map((template) => (
              <Project
                key={template.id}
                id={template.id}
                name={template.name}
                image={template.preview || undefined}
                description={template.description}
              />
            ))}
          </div>
        </div>
      )}
      <div className="space-y-7">
        <p className="text-5xl font-bold title">Find template to use</p>
        <SearchBar value={search} comp={comp} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          {templates.map((template) => (
            <Project
              key={template.id}
              id={template.id}
              name={template.name}
              description={template.description}
              image={template.preview || undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
