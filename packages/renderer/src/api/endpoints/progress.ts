import { getRenderProgress } from "@remotion/lambda/client";
import { bucketName, functionName, region } from "../../env";
import { GetProgressInput, GetProgressOutput } from "../../sdk";

export const getProgress = async ({
  renderId,
}: GetProgressInput): Promise<GetProgressOutput | null> => {
  const {
    overallProgress,
    costs,
    outputFile,
    fatalErrorEncountered,
    done,
    errors,
  } = await getRenderProgress({ bucketName, functionName, region, renderId });
  if (errors.length > 0) console.log(errors);
  return {
    progress: overallProgress,
    cost: costs.accruedSoFar,
    fileUrl: outputFile || "",
    status: fatalErrorEncountered ? "error" : done ? "done" : "rendering",
  };
};
