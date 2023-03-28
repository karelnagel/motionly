import { FileWithTranscription, MediaType, Transcription, UserFile } from "../../../../types";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { env } from "../../../../env.mjs";
import { TRPCError } from "@trpc/server";
import { getMediaType } from "../../../../helpers/getMediaType";
import { s3 } from "../../../../lib/aws";
import { updateTranscriptionProgress } from "../transcriptions/transcriptions";

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
        orderBy: { updatedAt: "desc" },
      });
      return { files };
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
      const signedUrl = await s3.headObject({ Bucket: env.MEDIA_BUCKET, Key }).promise();
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
          id: { in: id },
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

      let transcription: Transcription | undefined = undefined;
      console.log(file.transcription);
      if (file.transcription) {
        if (file.transcription.status === "PROCESSING") transcription = await updateTranscriptionProgress(file.id, file.transcription.id);
        else
          transcription = {
            ...file.transcription,
            transcript: file.transcription.transcript as any,
          };
      }
      const value: z.infer<typeof FileWithTranscription> = {
        ...file,
        transcription,
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
