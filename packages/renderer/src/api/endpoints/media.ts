import { renderMediaOnLambda } from "@remotion/lambda/client";
import { TemplateType } from "@motionly/base";
import { RenderMediaInput, RenderMediaOutput } from "../../sdk";
import { composition, functionName, region, serveUrl } from "../../env";

export const renderMedia = async ({
  comps,
  ...template
}: RenderMediaInput): Promise<RenderMediaOutput | null> => {
  const inputProps: TemplateType = {
    ...template,
    comps,
  };
  const { renderId } = await renderMediaOnLambda({
    serveUrl,
    codec: "h264",
    composition,
    functionName,
    region,
    inputProps,
  });
  return { renderId };
};
