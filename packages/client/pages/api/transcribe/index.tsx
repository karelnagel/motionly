import { NextApiRequest, NextApiResponse } from "next";
import Transcribe from "aws-sdk/clients/transcribeservice";
import { getServerSession } from "../../../lib/getServerSession";
import axios from "axios";
import { TranscriptionWord } from "@asius/components";

const transcribe = new Transcribe({
  region: "us-east-1",
  signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function SignedUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end();

  const keyReplace = (key: string) => key.replace(/[^0-9a-zA-Z._-]/g, "");

  if (req.method === "GET") {
    const { key } = req.query;
    const result = await transcribe
      .getTranscriptionJob({ TranscriptionJobName: keyReplace(key as string) })
      .promise();
    const transcriptUrl =
      result.TranscriptionJob?.Transcript?.TranscriptFileUri;
    if (!transcriptUrl) return res.status(404).end();
    const transcript = await axios.get(transcriptUrl);
    return res.status(200).json(transcriptionToJson(transcript.data));
  }
  if (req.method === "POST") {
    const { url, key } = req.body;
    if (!url) return res.status(400).end();
    const result = await transcribe
      .startTranscriptionJob({
        Media: { MediaFileUri: url },
        TranscriptionJobName: keyReplace(key),
        IdentifyLanguage: true,
      })
      .promise();
    return res.status(200).json(result);
  }

  return res.status(404).end();
}

const transcriptionToJson = (transcription: any): TranscriptionWord[] => {
  const items = transcription.results.items;
  return items
    .map((item: any, i: number) => {
      if (item.type === "punctuation") return null;
      const punctuation =
        items[i + 1]?.type === "punctuation"
          ? items[i + 1]?.alternatives[0].content
          : "";

      return {
        start: item.start_time,
        end: item.end_time,
        text: item.alternatives[0].content + punctuation,
      };
    })
    .filter((i: any) => i);
};
