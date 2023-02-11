import { RenderProgress, Template } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  getRenderProgress,
  renderMediaOnLambda,
  renderStillOnLambda,
} from "@remotion/lambda/client";
import {
  bucketName,
  composition,
  functionName,
  region,
  serveUrl,
} from "../../../oldEnv";

export const render = createTRPCRouter({
  media: protectedProcedure
    .input(z.object({ template: Template }))
    .output(z.string())
    .mutation(async ({ input, ctx }) => {
      const { renderId } = await renderMediaOnLambda({
        serveUrl,
        codec: "h264",
        composition,
        functionName,
        region,
        inputProps: input.template,
      });
      return renderId;
    }),
  still: protectedProcedure
    .input(z.object({ frame: z.number(), template: Template }))
    .output(RenderProgress)
    .mutation(async ({ input, ctx }) => {
      const { estimatedPrice, renderId, url } = await renderStillOnLambda({
        serveUrl,
        imageFormat: "jpeg",
        privacy: "public",
        frame: input.frame,
        composition,
        functionName,
        region,
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
    .input(z.string())
    .output(RenderProgress)
    .mutation(async ({ input, ctx }) => {
      const {
        overallProgress,
        costs,
        outputFile,
        fatalErrorEncountered,
        done,
        errors,
      } = await getRenderProgress({
        bucketName,
        functionName,
        region,
        renderId: input,
      });
      if (errors.length > 0) console.log(errors);
      return {
        renderId: input,
        progress: overallProgress,
        cost: costs.accruedSoFar,
        fileUrl: outputFile || undefined,
        status: fatalErrorEncountered ? "error" : done ? "done" : "rendering",
      };
    }),
});
