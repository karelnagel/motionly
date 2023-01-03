import { GetProgressInput, GetProgressOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ReqRes } from "../../../types";
import { getRenderProgress } from "@remotion/lambda";
import { functionName, region, bucketName } from "../../../env";
import { getServerSession } from "../../../lib/getServerSession";

export default async function Progress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = null;
  const renderId = req.query.renderId as string;
  if (req.method === "GET")
    result = await getProgress({ renderId }, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}

export const getProgress = async (
  { renderId }: GetProgressInput,
  reqRes?: ReqRes
): Promise<GetProgressOutput | null> => {
  const session = await getServerSession(reqRes);
  const { overallProgress, costs, outputFile, fatalErrorEncountered, done } =
    await getRenderProgress({ bucketName, functionName, region, renderId });
  return {
    progress: overallProgress,
    cost: costs.accruedSoFar,
    fileUrl: outputFile || "",
    status: fatalErrorEncountered ? "error" : done ? "done" : "rendering",
  };
};
