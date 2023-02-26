import { createTRPCRouter, publicProcedure } from "../../trpc";
import { z } from "zod";
import ytdl from "ytdl-core";

const tags = ["Youtube"];
const YoutubeVideo = z.object({
  url: z.string().url(),
  name: z.string(),
  thumbnail: z.string().url(),
  duration: z.string(),
  formats: z.array(
    z.object({
      width: z.number().optional(),
      height: z.number().optional(),
      fps: z.number().optional(),
      hasVideo: z.boolean(),
      hasAudio: z.boolean(),
      url: z.string().url(),
      approxDurationMs: z.string().optional(),
      mimeType: z.string().optional(),
      qualityLabel: z.string().nullable(),
      container: z.string(),
      contentLength: z.string().optional(),
    })
  ),
});

export const youtube = createTRPCRouter({
  get: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/youtube", tags },
    })
    .input(z.object({ url: z.string().url() }))
    .output(YoutubeVideo)
    .query(async ({ input: { url } }) => {
      const info = await ytdl.getInfo(url);
      const name = info.videoDetails.title;
      const thumbnail = info.videoDetails.thumbnails[0].url;
      const duration = info.videoDetails.lengthSeconds;
      const formats = info.formats;
      return { url, name, formats, thumbnail, duration };
    }),
});
