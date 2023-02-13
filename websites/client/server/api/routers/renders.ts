import { RenderProgress, Template } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  getRenderProgress,
  renderMediaOnLambda,
  renderStillOnLambda,
} from "@remotion/lambda/client";
import { env } from "../../../env.mjs";

const refreshProgress = async (id: string): Promise<RenderProgress> => {
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
    renderId: id,
  });

  if (errors.length > 0) console.log(errors);

  const render = await prisma.render.update({
    where: { id },
    data: {
      cost: costs.accruedSoFar,
      progress: overallProgress,
      status: fatalErrorEncountered
        ? "FAILED"
        : done
        ? "COMPLETED"
        : "PROCESSING",
      fileUrl: outputFile,
    },
  });
  return render;
};

const tags = ["Renders"];
export const renders = createTRPCRouter({
  getAll: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/renders", tags , protect: true} })
    .input(z.object({}))
    .output(
      z.object({
        renders: z.array(RenderProgress),
        stillCount: z.number().nullable(),
        mediaCount: z.number().nullable(),
        totalCost: z.number().nullable(),
      })
    )
    .query(async ({ ctx }) => {
      const oldRenders = await prisma.render.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
      const renders: RenderProgress[] = [];
      for (const render of oldRenders) {
        if (render.type === "MEDIA" && render.status === "PROCESSING") {
          renders.push(await refreshProgress(render.id));
        } else renders.push(render);
      }
      const stillCount = await prisma.render.aggregate({
        where: { userId: ctx.session.user.id, type: "STILL" },
        _count: { type: true },
      });
      const mediaCount = await prisma.render.aggregate({
        where: { userId: ctx.session.user.id, type: "MEDIA" },
        _count: { type: true },
      });
      const totalCost = await prisma.render.aggregate({
        where: { userId: ctx.session.user.id },
        _sum: { cost: true },
      });
      return {
        renders,
        stillCount: stillCount._count.type,
        mediaCount: mediaCount._count.type,
        totalCost: totalCost._sum.cost,
      };
    }),
  media: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/renders/media", tags, protect: true } })
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
      const render = await prisma.render.create({
        data: { id: renderId, userId: ctx.session.user.id, type: "MEDIA" },
      });
      return { renderId };
    }),
  still: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/renders/still", tags, protect: true } })
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
      const render = await prisma.render.create({
        data: {
          id: renderId,
          userId: ctx.session.user.id,
          cost: estimatedPrice.accruedSoFar,
          fileUrl: url,
          status: "COMPLETED",
          progress: 1,
          type: "STILL",
        },
      });
      return render;
    }),
});
