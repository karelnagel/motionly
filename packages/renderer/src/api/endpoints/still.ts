import { renderStillOnLambda } from "@remotion/lambda/client";
import { RenderStillInput, RenderStillOutput } from "../../sdk";
import { composition, functionName, region, serveUrl } from "../../env";
import { applyInputs } from "@motionly/base";

export const renderStill = async ({
  frame,
  ...template
}: RenderStillInput): Promise<RenderStillOutput | null> => {
  const temp = applyInputs(template);
  const { estimatedPrice, renderId, url } = await renderStillOnLambda({
    serveUrl,
    imageFormat: "jpeg",
    privacy: "public",
    frame,
    composition,
    functionName,
    region,
    inputProps: temp,
  });
  return {
    renderId,
    cost: estimatedPrice.accruedSoFar,
    fileUrl: url,
    status: "done",
  };
};
