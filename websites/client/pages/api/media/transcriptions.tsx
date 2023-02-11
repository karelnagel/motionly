/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import Transcribe from "aws-sdk/clients/transcribeservice";
import { getServerSession } from "../../../lib/getServerSession";
import axios from "axios";
import { TranscriptionWord } from "@motionly/base";
import { awsClientConfig } from "../../../oldEnv";

const transcribe = new Transcribe(awsClientConfig);

const keyReplace = (key: string) => key.replace(/[^0-9a-zA-Z._-]/g, "-");

export default async function SignedUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res });
  if (!session) return res.status(401).end("Not logged in");

  if (req.method === "GET") {
    try {
      const { key } = req.query;
      if (!key) return res.status(400).end("No key");

      const result = await transcribe
        .getTranscriptionJob({
          TranscriptionJobName: keyReplace(key as string),
        })
        .promise();
      const status = result.TranscriptionJob?.TranscriptionJobStatus;
      const transcriptUrl =
        result.TranscriptionJob?.Transcript?.TranscriptFileUri;
      const transcript = transcriptUrl
        ? (await axios.get(transcriptUrl)).data
        : null;
      return res
        .status(200)
        .json({ transcription: transcriptionToJson(transcript), status });
    } catch (e) {
      return res.status(404).end("Transcription not found");
    }
  }

  if (req.method === "POST") {
    try {
      const { url, key } = req.body;
      if (!url || !key) return res.status(400).end("No url or key");
      await transcribe
        .startTranscriptionJob({
          Media: { MediaFileUri: url },
          TranscriptionJobName: keyReplace(key),
          IdentifyLanguage: true,
        })
        .promise();
      return res.status(200).json({ key });
    } catch (e) {
      console.log(e);
      return res.status(500).end("Error starting transcription");
    }
  }

  return res.status(404).end("Not found");
}

const transcriptionToJson = (
  transcription: any
): TranscriptionWord[] | undefined => {
  if (!transcription) return;
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
