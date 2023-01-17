import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "../../../lib/getServerSession";
import { awsClientConfig, mediaBucket } from "../../../env";

const s3 = new S3(awsClientConfig);
export default async function SignedUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end("Not logged in");
  const { name, type } = req.body;
  if (!type || !name) return res.status(400).end("No type or name!");
  if (!["image", "video", "gif", "audio"].includes(type.split("/")[0]))
    return res.status(400).end("Invalid file type");

  if (req.method === "POST") {
    const key = `${session.user?.id}/${name}`;
    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: mediaBucket,
      Key: key,
      Expires: 60 * 60 * 24,
      ContentType: type,
    });
    return res.status(200).json({ url, key });
  }

  return res.status(404).end();
}
