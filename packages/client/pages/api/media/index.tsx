import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "../../../lib/getServerSession";

const s3 = new S3({
  region: "us-east-1",
  signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function GetMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end();
  if (req.method === "GET") {
    const objects = await s3
      .listObjectsV2({
        Bucket: "asius-media",
        Prefix: `${session.user?.id}/`,
      })
      .promise();
    return res.status(200).json(objects.Contents?.map((o) => o.Key));
  }

  return res.status(404).end();
}
