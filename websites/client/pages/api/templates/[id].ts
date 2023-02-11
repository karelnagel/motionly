import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "../../../lib/getServerSession";
import { prisma } from "../../../lib/prisma";
import {
  DeleteProjectInput,
  DeleteProjectOutput,
} from "../../../sdk/templates/delete";
import {
  UpdateProjectInput,
  UpdateProjectOutput,
} from "../../../sdk/templates/update";
import { ReqRes } from "../../../types";

export default async function Project(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = null;
  const id = req.query.id as string;
  if (req.method === "PUT")
    result = await updateProject({ id, project: req.body }, { req, res });
  else if (req.method === "DELETE") result = await deleteProject({ id });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}

const updateProject = async (
  { id, project }: UpdateProjectInput,
  reqRes?: ReqRes
): Promise<UpdateProjectOutput | null> => {
  const session = await getServerSession(reqRes);
  if (!session?.user?.email) return null;
  // Todo check if user is owner
  let preview = undefined;
  try {
    // preview = (await renderStill({ ...template, frame: 10 }))?.fileUrl;
  } catch {
    preview = undefined;
  }
  try {
    const result = await prisma.project.update({
      where: { id },
      data: {
        name: project.name,
        public: project.public,
        description: project.description,
        template: project.template as any,
        preview,
      },
      include: { user: true },
    });
    const isOwner = session.user.email === result.user.email;

    return {
      isOwner,
      public: result.public,
      description: result.description,
      preview: result.preview || undefined,
      name: result.name,
      id: result.id,
      template: result.template as any,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deleteProject = async ({
  id,
}: DeleteProjectInput): Promise<DeleteProjectOutput | null> => {
  const result = await prisma.project.delete({
    where: { id },
  });

  return {
    ...result,
    preview: result.preview || undefined,
    template: result.template as any,
  };
};
