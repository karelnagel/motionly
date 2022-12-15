import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export const revalidate = 1;

export default async function Templates() {
  const session = await unstable_getServerSession(authOptions);
  const templates = await prisma.template.findMany({
    where: { OR: [{ public: true }, { user: { email: session?.user?.email } }] },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <p>Templates</p>
      <div className="grid grid-cols-3">
        {templates.map((template) => (
          <Link
            key={template.id}
            href={`/templates/${template.id}`}
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
    </div>
  );
}
