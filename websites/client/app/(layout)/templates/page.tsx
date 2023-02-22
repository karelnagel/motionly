import { SearchBar } from "../../../components/SearchBar";
import { Project } from "../../../components/Project";
import { getServerSession } from "../../../lib/getServerSession";
import { Clone } from "../../../components/Clone";
import { prismaProjectToProject } from "../../../helpers/projectToProject";
import { IoIosAdd } from "react-icons/io";

export const dynamic = "force-dynamic";

export default async function Templates({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const session = await getServerSession();
  const search = searchParams?.search || undefined;
  const comp = searchParams?.comp || undefined;
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
        { template: { string_contains: comp } },
      ],
    },
    orderBy: { renders: { _count: "desc" } },
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
            <Clone className="btn space-x-1">
              <IoIosAdd className="text-2xl -m-1" />
              <p>Create New</p>
            </Clone>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {yourProjects.map((project) => (
              <Project
                key={project.id}
                project={prismaProjectToProject(project)}
                isOwner={true}
              />
            ))}
          </div>
        </div>
      )}
      <div className="space-y-7">
        <p className="text-5xl font-bold title">Find template to use</p>
        <SearchBar value={search} comp={comp} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          {templates.map((project) => (
            <Project
              key={project.id}
              project={prismaProjectToProject(project)}
              isOwner={project.userId === session?.user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
