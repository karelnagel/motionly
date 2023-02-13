import { renderStillOnLambda } from "@remotion/lambda/client";
import { RenderStillInput, RenderStillOutput } from "../../sdk";
import { composition, functionName, region, serveUrl } from "../../env";

export const renderStill = async ({
  frame,
  ...template
}: RenderStillInput): Promise<RenderStillOutput | null> => {
  const { estimatedPrice, renderId, url } = await renderStillOnLambda({
    serveUrl,
    imageFormat: "jpeg",
    privacy: "public",
    frame,
    composition,
    functionName,
    region,
    inputProps: template,
  });
  return {
    renderId,
    cost: estimatedPrice.accruedSoFar,
    fileUrl: url,
    status: "done",
  };
};
