import { RenderProgress, Template } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  getRenderProgress,
  renderMediaOnLambda,
  renderStillOnLambda,
} from "@remotion/lambda/client";
import { env } from "../../../env.mjs";

const tags = ["Render"];
export const render = createTRPCRouter({
  media: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/render/media", tags } })
    .input(z.object({ template: Template }))
    .output(z.object({ renderId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { renderId } = await renderMediaOnLambda({
        serveUrl: env.REMOTION_AWS_SERVE_URL,
        codec: "h264",
        composition: env.REMOTION_COMPOSITION,
        functionName: env.REMOTION_AWS_FUNCTION_NAME,
        region: env.REMOTION_AWS_REGION as any,
        inputProps: input.template,
      });
      return { renderId };
    }),
  still: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/render/still", tags } })
    .input(z.object({ frame: z.number(), template: Template }))
    .output(RenderProgress)
    .mutation(async ({ input, ctx }) => {
      const { estimatedPrice, renderId, url } = await renderStillOnLambda({
        serveUrl: env.REMOTION_AWS_SERVE_URL,
        imageFormat: "jpeg",
        privacy: "public",
        frame: input.frame,
        composition: env.REMOTION_COMPOSITION,
        functionName: env.REMOTION_AWS_FUNCTION_NAME,
        region: env.REMOTION_AWS_REGION as any,
        inputProps: input.template,
      });
      return {
        renderId,
        progress: 1,
        cost: estimatedPrice.accruedSoFar,
        fileUrl: url,
        status: "done",
      };
    }),

  progress: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/render/progress", tags } })
    .input(z.object({ renderId: z.string() }))
    .output(RenderProgress)
    .mutation(async ({ input: { renderId }, ctx }) => {
      const {
        overallProgress,
        costs,
        outputFile,
        fatalErrorEncountered,
        done,
        errors,
      } = await getRenderProgress({
        bucketName: env.REMOTION_AWS_BUCKET,
        functionName: env.REMOTION_AWS_FUNCTION_NAME,
        region: env.REMOTION_AWS_REGION as any,
        renderId,
      });
      if (errors.length > 0) console.log(errors);
      return {
        renderId,
        progress: overallProgress,
        cost: costs.accruedSoFar,
        fileUrl: outputFile || undefined,
        status: fatalErrorEncountered ? "error" : done ? "done" : "rendering",
      };
    }),
});
