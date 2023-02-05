import { renderMediaOnLambda } from "@remotion/lambda/client";
import { RenderMediaInput, RenderMediaOutput } from "../../sdk";
import { composition, functionName, region, serveUrl } from "../../env";

export const renderMedia = async (
  template: RenderMediaInput
): Promise<RenderMediaOutput | null> => {
  const { renderId } = await renderMediaOnLambda({
    serveUrl,
    codec: "h264",
    composition,
    functionName,
    region,
    inputProps: template,
  });
  return { renderId };
};
