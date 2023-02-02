import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { ReqRes } from "../../../types";
import { getServerSession } from "../../../lib/getServerSession";
import {
  PostNewTemplateInput,
  PostNewTemplateOutput,
} from "../../../sdk/templates/new";

export default async function NewTemplate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = null;
  if (req.method === "POST")
    result = await postNewTemplate(req.body, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}

const postNewTemplate = async (
  input: PostNewTemplateInput,
  reqRes?: ReqRes
): Promise<PostNewTemplateOutput | null> => {
  const session = await getServerSession(reqRes);

  if (!session?.user?.email) return null;
  const result = await prisma.template.create({
    data: {
      comps: JSON.stringify(input.comps),
      width: input.width,
      height: input.height,
      duration: input.duration,
      fps: input.fps,
      inputs: input.inputs ? JSON.stringify(input.inputs) : undefined,
      name: input.name + " (Copy)",
      description: input.description,
      preview: input.preview,
      public: false,
      user: { connect: { email: session.user.email } },
    },
  });
  return {
    ...result,
    comps: JSON.parse(result.comps),
    preview: result.preview || undefined,
    inputs: result.inputs ? JSON.parse(result.inputs) : undefined,
  };
};
