import { FileWithTranscription, MediaType, UserFile } from "../../../../types";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { env } from "../../../../env.mjs";
import { TRPCError } from "@trpc/server";
import { getMediaType } from "../../../../helpers/getMediaType";
import ytdl from "ytdl-core";
import { s3 } from "../../../../lib/aws";

const tags = ["Media"];
const protect = true;
export const media = createTRPCRouter({
  getAll: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/media", tags, protect } })
    .input(z.object({ type: MediaType.optional() }))
    .output(z.object({ files: z.array(UserFile) }))
    .query(async ({ input: { type }, ctx }) => {
      const files = await ctx.prisma.file.findMany({
        where: {
          userId: ctx.session.user.id,
          type,
          url: { contains: "https://" },
        },
      });
      return { files };
    }),
  youtube: protectedProcedure
    .meta({
      openapi: { method: "POST", path: "/media/youtube", tags, protect },
    })
    .input(z.object({ youtubeUrl: z.string().url() }))
    .output(UserFile)
    .mutation(async ({ input: { youtubeUrl }, ctx }) => {
      const info = await ytdl.getInfo(youtubeUrl);
      const name = info.videoDetails.title;
      const formats = info.formats.filter(
        (v) => v.container === "mp4" && v.hasVideo && v.hasAudio
      );
      const { url } = formats[0];
      if (!url)
        throw new TRPCError({ code: "BAD_REQUEST", message: "No video found" });

      const file = await ctx.prisma.file.create({
        data: {
          name,
          type: "VIDEO",
          url,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return file;
    }),

  new: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/media/new", tags, protect } })
    .input(z.object({ type: z.string(), name: z.string() }))
    .output(z.object({ signedUrl: z.string(), id: z.string() }))
    .mutation(async ({ input: { type, name }, ctx }) => {
      const mediaType = getMediaType(type);
      if (!mediaType)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid media type",
        });
      const file = await ctx.prisma.file.create({
        data: {
          name,
          type: mediaType,
          userId: ctx.session.user.id,
        },
      });
      const Key = `${ctx.session.user.id}/${file.id}`;
      const signedUrl = await s3.getSignedUrlPromise("putObject", {
        Bucket: env.MEDIA_BUCKET,
        Key,
        Expires: 60 * 60 * 24,
        ContentType: type,
      });
      return { signedUrl, id: file.id };
    }),

  verify: protectedProcedure
    .meta({
      openapi: { method: "POST", path: "/media/{id}/verify", tags, protect },
    })
    .input(z.object({ id: z.string() }))
    .output(UserFile)
    .mutation(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          user: {
            id: ctx.session.user.id,
          },
        },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const Key = `${ctx.session.user.id}/${file.id}`;
      const signedUrl = await s3
        .headObject({ Bucket: env.MEDIA_BUCKET, Key })
        .promise();
      if (!signedUrl.ContentLength)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const updatedFile = await ctx.prisma.file.update({
        where: {
          id: file.id,
        },
        data: {
          url: `https://${env.MEDIA_BUCKET}.s3.amazonaws.com/${Key}`,
        },
      });
      return updatedFile;
    }),

  get: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/media/{id}", tags, protect } })
    .input(z.object({ id: z.string() }))
    .output(FileWithTranscription)
    .query(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
          url: { contains: "https://" },
        },
        include: { transcription: true },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const value: z.infer<typeof FileWithTranscription> = {
        ...file,
        transcription: file.transcription
          ? {
              ...file.transcription,
              transcript: file.transcription.transcript as any,
            }
          : undefined,
      };
      return value;
    }),

  delete: protectedProcedure
    .meta({ openapi: { method: "DELETE", path: "/media/{id}", tags, protect } })
    .input(z.object({ id: z.string() }))
    .output(z.object({}))
    .mutation(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const Key = `${ctx.session.user.id}/${file.id}`;
      await s3.deleteObject({ Bucket: env.MEDIA_BUCKET, Key }).promise();
      await ctx.prisma.file.delete({
        where: {
          id: file.id,
        },
      });
      return {};
    }),
});
