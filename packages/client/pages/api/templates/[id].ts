import {
  DeleteTemplateInput,
  DeleteTemplateOutput,
  GetTemplateInput,
  GetTemplateOutput,
  UpdateTemplateInput,
  UpdateTemplateOutput,
} from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "../../../lib/getServerSession";
import { prisma } from "../../../lib/prisma";
import { ReqRes } from "../../../types";

export default async function Template(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = null;
  const id = req.query.id as string;
  if (req.method === "GET") result = await getTemplate({ id }, { req, res });
  else if (req.method === "PUT")
    result = await updateTemplate({ id, template: req.body }, { req, res });
  else if (req.method === "DELETE") result = await deleteTemplate({ id });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}

export const getTemplate = async (
  { id }: GetTemplateInput,
  reqRes?: ReqRes
): Promise<GetTemplateOutput | null> => {
  const session = await getServerSession(reqRes);
  const template = await prisma.template.findFirst({
    where: {
      id,
      OR: [{ public: true }, { user: { email: session?.user?.email } }],
    },
    include: { user: true },
  });
  if (!template) return null;
  const { width, height, duration, name, description, comps, fps, background } =
    template;
  const isOwner = session?.user?.email === template.user.email;
  return {
    comps: JSON.parse(comps),
    width,
    height,
    name,
    description,
    id,
    duration,
    fps,
    public: template.public,
    isOwner,
    background: background || undefined,
  };
};

const updateTemplate = async (
  { id, template }: UpdateTemplateInput,
  reqRes?: ReqRes
): Promise<UpdateTemplateOutput | null> => {
  const session = await getServerSession(reqRes);
  if (!session?.user?.email) return null;
  // Todo check if user is owner
  try {
    const { comps, ...result } = await prisma.template.update({
      where: { id },
      data: {
        comps: JSON.stringify(template.comps),
        width: template.width,
        height: template.height,
        name: template.name,
        public: template.public,
        description: template.description,
        fps: template.fps,
        duration: template.duration,
      },
      include: { user: true },
    });
    const isOwner = session.user.email === result.user.email;

    return {
      comps: JSON.parse(comps),
      duration: result.duration,
      fps: result.fps,
      isOwner,
      public: result.public,
      width: result.width,
      height: result.height,
      description: result.description,
      name: result.name,
      id: result.id,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deleteTemplate = async ({
  id,
}: DeleteTemplateInput): Promise<DeleteTemplateOutput | null> => {
  const { comps, ...result } = await prisma.template.delete({ where: { id } });

  return {
    ...result,
    comps: JSON.parse(comps),
    background: result.background || undefined,
  };
};
