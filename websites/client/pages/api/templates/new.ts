import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { ReqRes } from "../../../types";
import { getServerSession } from "../../../lib/getServerSession";
import {
  PostNewProjectInput,
  PostNewProjectOutput,
} from "../../../sdk/templates/new";

export default async function NewProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = null;
  if (req.method === "POST")
    result = await postNewProject(req.body, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}

const postNewProject = async (
  input: PostNewProjectInput,
  reqRes?: ReqRes
): Promise<PostNewProjectOutput | null> => {
  const session = await getServerSession(reqRes);

  if (!session?.user?.email) return null;
  const result = await prisma.project.create({
    data: {
      template: input.template as any,
      name: input.name + " (Copy)",
      description: input.description,
      preview: input.preview,
      public: false,
      user: { connect: { email: session.user.email } },
    },
  });
  return {
    ...result,
    preview: result.preview || undefined,
    template: result.template as any,
  };
};
