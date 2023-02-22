import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getYoutubeUrl } from "../../../../lib/getYoutubeUrl";
import prisma from "../../../../server/db";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).send("Missing id parameter");
  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return res.status(404).send("File not found");
  if (!file.youtubeUrl) return res.redirect(307, file.url);

  try {
    const result = await axios.head(file.url);
    if (result.status === 200) {
      return res.redirect(307, file.url);
    }
  } catch {}

  const { url } = await getYoutubeUrl(file.youtubeUrl);
  if (!url) return res.status(500).send("Failed to get youtube url");

  await prisma.file.update({
    where: { id },
    data: { url },
  });
  return res.redirect(307, url);
};

export default handler;
