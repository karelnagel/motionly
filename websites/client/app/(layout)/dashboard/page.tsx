import { SearchBar } from "../../../components/SearchBar";
import { Project } from "../../../components/Project";
import { Title } from "../../../components/Title";

export const dynamic = "force-dynamic";

export default async function Templates({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
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
  return (
    <div>
      <Title text="Find template to use" />
      <SearchBar value={search} comp={comp} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
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
  );
}
