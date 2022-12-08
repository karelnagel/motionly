/* eslint-disable @next/next/no-img-element */
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { Edit } from "./Edit";
import Test from "./Test";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await unstable_getServerSession(authOptions);
  const template = await prisma.template.findFirst({
    where: { id, OR: [{ public: true }, { user: { email: session?.user?.email } }] },
    include: { user: true },
  });
  if (!template) return <div>No template with this id!</div>;

  const isOwner = template.user.email === session?.user?.email;
  return (
    <div className=" flex flex-col items-center max-w-screen-sm m-auto">
      <p>{template.name}</p>
      <p>{template.description}</p>
      <img
        src={`/api/images/${id}`}
        style={{ aspectRatio: `${template.width}/${template.height}` }}
        alt={template.name}
      />
      <Test elements={template.elements} id={id} />
      {session && <Link href={`/templates/new?id=${id}`}>Duplicate</Link>}
      {isOwner && <Link href={`/edit/${id}`}>Edit layout</Link>}
      {isOwner && (
        <Edit
          template={{
            name: template.name,
            description: template.description,
            id: template.id,
            public: template.public,
          }}
        />
      )}
    </div>
  );
}
