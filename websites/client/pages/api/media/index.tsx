import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "../../../lib/getServerSession";
import { awsClientConfig } from "../../../helpers/awsClientConfig";
import { getFileType, getMediaUrl } from "../../../helpers/file";
import { UserFile } from "../../../hooks/useFiles";
import { env } from "../../../env.mjs";

const s3 = new S3(awsClientConfig);

export default async function GetMedia(
  req: NextApiRequest,
  res: NextApiResponse<UserFile[] | UserFile>
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end("Not logged in");
  if (req.method === "GET") {
    try {
      const objects = await s3
        .listObjectsV2({
          Bucket: env.MEDIA_BUCKET,
          Prefix: `${session.user?.id}/`,
        })
        .promise();

      const media =
        objects?.Contents?.map((o) => ({
          name: o.Key?.split("/").pop() || "",
          url: getMediaUrl(o.Key || ""),
          type: getFileType(o.Key || ""),
        })) || [];

      return res.status(200).json(media);
    } catch (e) {
      console.log(e);
      return res.status(500).end("Error getting media");
    }
  }

  if (req.method === "DELETE") {
    const { key } = req.body;
    if (!key) return res.status(400).end("No name!");
    try {
      await s3
        .deleteObject({
          Bucket: env.MEDIA_BUCKET,
          Key: `${session.user?.id}/${key}`,
        })
        .promise();
      return res.status(200).end("File deleted");
    } catch (e) {
      console.log(e);
      return res.status(500).end("Error deleting file");
    }
  }
  return res.status(404).end("Not found");
}
