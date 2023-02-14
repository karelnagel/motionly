import { ImageFormat, Template } from "../types";
import { renderStillOnLambda } from "@remotion/lambda/client.js";
import { env } from "../env.mjs";

export const renderStill = async (
  template: Template,
  frame: number,
  imageFormat: ImageFormat = "jpeg"
) => {
  return await renderStillOnLambda({
    serveUrl: env.REMOTION_AWS_SERVE_URL,
    imageFormat,
    privacy: "public",
    frame: frame,
    composition: env.REMOTION_COMPOSITION,
    functionName: env.REMOTION_AWS_FUNCTION_NAME,
    region: env.REMOTION_AWS_REGION as any,
    inputProps: template,
  });
};
