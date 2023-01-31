import { renderMediaOnLambda } from "@remotion/lambda/client";
import { applyInputs } from "@motionly/base";
import { RenderMediaInput, RenderMediaOutput } from "../../sdk";
import { composition, functionName, region, serveUrl } from "../../env";

export const renderMedia = async (
  template: RenderMediaInput
): Promise<RenderMediaOutput | null> => {
  const temp = applyInputs(template);

  const { renderId } = await renderMediaOnLambda({
    serveUrl,
    codec: "h264",
    composition,
    functionName,
    region,
    inputProps: temp,
  });
  return { renderId };
};
