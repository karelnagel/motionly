import Edit from "./Edit";
import { prisma } from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export const revalidate = 1;

export default async function Page({ params: { id } }: { params: { id: string } }) {
  if (!id) return <div>No id!</div>;
  const session = await unstable_getServerSession(authOptions);
  const template = await prisma.template.findFirst({
    where: { id, user: { email: session?.user?.email } },
  });
  if (!template) return <div>No template!</div>;
  const { width, height, name, description, elements } = template;
  return (
    <div>
      <Edit
        template={
          {
            width,
            height,
            elements,
            id,
            name,
            description,
          } as any
        }
      />
    </div>
  );
}
