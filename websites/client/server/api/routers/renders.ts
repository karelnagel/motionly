import { RenderProgress, Template } from "../../../types";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  getRenderProgress,
  renderMediaOnLambda,
} from "@remotion/lambda/client";
import { env } from "../../../env.mjs";
import { renderStill } from "../../../lib/renderStill";
import { TRPCError } from "@trpc/server";
import { Render } from "@prisma/client";

const refreshProgress = async (id: string): Promise<Render> => {
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
    .meta({
      openapi: { method: "GET", path: "/renders", tags, protect: true },
    })
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
  get: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/renders/{id}", tags },
    })
    .input(z.object({ id: z.string() }))
    .output(
      z.object({
        render: RenderProgress,
      })
    )
    .query(async ({ ctx }) => {
      let render = await prisma.render.findFirst({
        where: { userId: ctx.session?.user.id || null },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
      if (!render) throw new TRPCError({ code: "NOT_FOUND" });

      if (render.type === "MEDIA" && render.status === "PROCESSING")
        render = await refreshProgress(render.id);

      return { render };
    }),
  media: publicProcedure
    .meta({ openapi: { method: "POST", path: "/renders/media", tags } })
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
        data: { id: renderId, userId: ctx.session?.user.id, type: "MEDIA" },
      });
      return { renderId };
    }),
  still: publicProcedure
    .meta({ openapi: { method: "POST", path: "/renders/still", tags } })
    .input(
      z.object({
        frame: z.number(),
        template: Template,
      })
    )
    .output(RenderProgress)
    .mutation(async ({ input, ctx }) => {
      const { estimatedPrice, renderId, url } = await renderStill(
        input.template,
        input.frame
      );
      const render = await prisma.render.create({
        data: {
          id: renderId,
          userId: ctx.session?.user.id,
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
