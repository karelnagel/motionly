import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/db";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).send("Missing id parameter");
  const file = await prisma.file.findUnique({
    where: { id },
    include: { transcription: true },
  });
  if (!file) return res.status(404).send("File not found");

  if (!file.transcription)
    return res.status(404).send("Transcription not found");
  return res.json(file.transcription?.transcript);
};

export default handler;
