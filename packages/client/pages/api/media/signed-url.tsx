import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "../../../lib/getServerSession";

export default async function SignedUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end();
  const { name, type } = req.body;
  if (req.method === "POST") {
    const s3 = new S3({
      region: "us-east-1",
      signatureVersion: "v4",
      credentials: {
        accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || "",
      },
    });
    const key = `${session.user?.id}/${name}`;
    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: "asius-media",
      Key: key,
      Expires: 60 * 60 * 24,
      ContentType: type,
    });
    return res.status(200).json({ url, key });
  }

  return res.status(404).end();
}
