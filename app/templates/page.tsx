import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Templates() {
  const templates = await new PrismaClient().template.findMany();
  return (
    <div>
      <p>Templates</p>
      <div className="grid grid-cols-3">
        {templates.map((template) => (
          <Link
            key={template.id}
            href={`/edit?id=${template.id}`}
            className=" relative rounded-lg overflow-hidden h-40 w-60"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/images/${template.id}`} alt={template.name} className="cover" />
            <div className="absolute bottom-0 w-full left-0 py-2 text-center bg-black text-white bg-opacity-50">
              {template.name}
            </div>
          </Link>
        ))}
      </div>
      <Link href="/templates/new">NEW</Link>
      <Link href="/edit/id">EDIT</Link>
    </div>
  );
}
