import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getYoutubeUrl } from "../../../lib/getYoutubeUrl";
import prisma from "../../../server/db";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).send("Missing id parameter");
  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return res.status(404).send("File not found");
  let url = file.url;
  if (file.youtubeUrl) {
    const result = await axios.head(file.url);
    if (result.status !== 200) {
      const { url: newUrl } = await getYoutubeUrl(file.youtubeUrl);
      if (newUrl) {
        await prisma.file.update({
          where: { id },
          data: { url: newUrl },
        });
        url = newUrl;
      }
    }
  }

  return res.redirect(307, file.url);
};

export default handler;
