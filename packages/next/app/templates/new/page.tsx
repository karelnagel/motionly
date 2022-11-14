import { unstable_getServerSession } from "next-auth";
import { UnAuthorized } from "../../../components/UnAuthorized";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Create from "./Create";
import { prisma } from "../../../lib/prisma";

export default async function Page({ searchParams: { id } }: { searchParams: { id?: string } }) {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return <UnAuthorized />;
  const template = !id
    ? null
    : await prisma.template.findFirst({
        where: { id, OR: [{ public: true }, { user: { email: session.user?.email } }] },
      });
  return (
    <div>
      <p>{template ? `Duplicating template "${template.name}"` : "Create new"}</p>
      <Create
        duplicateId={template?.id}
        duplicateName={template?.name}
        duplicateDescription={template?.description}
      />
    </div>
  );
}
