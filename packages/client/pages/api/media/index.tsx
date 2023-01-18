import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "../../../lib/getServerSession";
import { awsClientConfig, mediaBucket } from "../../../env";

const s3 = new S3(awsClientConfig);

export default async function GetMedia(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end("Not logged in");
  if (req.method === "GET") {
    const { type } = req.query;
    try {
      const objects = await s3
        .listObjectsV2({
          Bucket: mediaBucket,
          Prefix: `${session.user?.id}/`,
        })
        .promise();
      const media = objects?.Contents?.map((o) => o.Key).filter((f) => {
        if (!f) return false;
        const ending = f.toLowerCase().split(".").pop();
        if (!ending) return false;
        return (
          type === undefined ||
          (type === "video" &&
            ["mp4", "mkv", "mp3", "avi", "flv", "mkv", "webm"].includes(
              ending
            )) ||
          (type === "image" &&
            ["png", "jpg", "jpeg", "svg", "ico", "webp"].includes(ending)) ||
          (type === "gif" && ["gif"].includes(ending))
        );
      });
      return res.status(200).json(media);
    } catch (e) {
      console.log(e);
      return res.status(500).end("Error getting media");
    }
  }

  return res.status(404).end("Not found");
}
