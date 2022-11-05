import { PrismaClient } from "@prisma/client";

export default async function Page({ params: { id } }: any) {


  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
