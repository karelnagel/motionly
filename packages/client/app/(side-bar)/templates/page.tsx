import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "../../../components/SearchBar";
import { Title } from "../../../components/Title";
import { prisma } from "../../../lib/prisma";

export const revalidate = 1;

export default async function Templates({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const search = searchParams?.search || "";
  const comp = searchParams?.comp || "";
  const templates = await prisma.template.findMany({
    where: {
      public: true,
      AND: [
        { OR: [{ name: { contains: search } }, { description: { contains: search } }] },
        { comps: { contains: `${comp}` } }, // Todo make more specific
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <Title text="Find Template To Start" />
      <SearchBar value={search} comp={comp} />
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

const Template = ({ name, image, id }: { name: string; image: string; id: string }) => {
  return (
    <Link className="flex flex-col space-y-1" href={`/templates/${id}`}>
      <div className="aspect-video relative bg-base-200 rounded-lg overflow-hidden">
        <Image src={image} fill={true} alt="template" className="object-contain" />
      </div>
      <p className="font-bold">{name}</p>
    </Link>
  );
};
