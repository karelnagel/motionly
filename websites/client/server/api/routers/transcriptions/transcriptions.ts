import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { transcribe } from "../../../../lib/aws";
import {
  Transcript,
  Transcription,
  TranscriptionStatus,
} from "../../../../types";

const tags = ["Transcriptions"];
const protect = true;
export const transcriptions = createTRPCRouter({
  transcribe: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/media/{fileId}/transcriptions/",
        tags,
        protect,
      },
    })
    .input(z.object({ fileId: z.string() }))
    .output(z.object({}))
    .mutation(async ({ input, ctx }) => {
      const { fileId } = input;
      const media = await ctx.prisma.file.findFirst({
        where: {
          id: fileId,
          type: { in: ["AUDIO", "VIDEO"] },
          userId: ctx.session.user.id,
        },
        include: { transcription: true },
      });
      if (!media)
        throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
      if (media.transcription)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already transcribed",
        });

      await transcribe
        .startTranscriptionJob({
          Media: { MediaFileUri: media.url },
          TranscriptionJobName: media.id,
          IdentifyLanguage: true,
          Settings: {
            ShowSpeakerLabels: true,
            MaxSpeakerLabels: 4,
          },
        })
        .promise();
      const trans = await ctx.prisma.transcription.create({
        data: {
          file: { connect: { id: media.id } },
          status: "PROCESSING",
        },
      });
      return trans;
    }),
  progress: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/media/{fileId}/transcriptions/progress",
        tags,
        protect,
      },
    })
    .input(z.object({ fileId: z.string() }))
    .output(Transcription)
    .mutation(async ({ input: { fileId }, ctx }) => {
      const transcription = await ctx.prisma.transcription.findFirst({
        where: {
          fileId,
          file: { userId: ctx.session.user.id },
        },
      });

      if (!transcription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transcription not found",
        });
      }
      const res = await getTranscription(fileId);
      const newTrans = await ctx.prisma.transcription.update({
        where: { id: transcription.id },
        data: {
          status: res.status,
          text: res.text,
          transcript: res.transcript,
          language: res.language,
          persons: res.persons,
        },
      });
      return {
        ...newTrans,
        transcript: (newTrans.transcript as any) ,
      };
    }),
  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/media/{fileId}/transcriptions/",
        tags,
        protect,
      },
    })
    .input(z.object({ fileId: z.string() }))
    .output(Transcription)
    .mutation(async ({ input: { fileId }, ctx }) => {
      const transcription = await ctx.prisma.transcription.findFirst({
        where: {
          fileId,
          file: { userId: ctx.session.user.id },
        },
      });

      if (!transcription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transcription not found",
        });
      }
      await transcribe
        .deleteTranscriptionJob({
          TranscriptionJobName: fileId,
        })
        .promise();
      const deletedTrans = await ctx.prisma.transcription.delete({
        where: { id: transcription.id },
      });
      return {
        ...deletedTrans,
        transcript: deletedTrans.transcript as any,
      };
    }),
});

const getTranscription = async (
  fileId: string
): Promise<{
  status: TranscriptionStatus;
  text?: string;
  transcript?: Transcript[];
  language?: string;
  persons?: number;
}> => {
  try {
    const result = await transcribe
      .getTranscriptionJob({
        TranscriptionJobName: fileId,
      })
      .promise();
    const transStatus = result.TranscriptionJob?.TranscriptionJobStatus;
    const status =
      transStatus === "COMPLETED"
        ? "COMPLETED"
        : transStatus === "FAILED"
        ? "FAILED"
        : "PROCESSING";

    const url = result.TranscriptionJob?.Transcript?.TranscriptFileUri;
    if (status !== "COMPLETED" || !url) return { status };
    const transcript = (await axios.get(url)).data;
    return {
      status,
      transcript: transcriptionToJson(transcript),
      text: transcript.results.transcripts[0].transcript,
      language: transcript.results.language_code,
      persons: transcript.results.speaker_labels?.speakers,
    };
  } catch (e) {
    return { status: "FAILED" };
  }
};

const transcriptionToJson = (transcription: any): Transcript[] | undefined => {
  if (!transcription) return;
  const items = transcription.results.items;
  return items
    .map((item: any, i: number) => {
      if (item.type === "punctuation") return null;
      const punctuation =
        items[i + 1]?.type === "punctuation"
          ? items[i + 1]?.alternatives[0].content
          : "";

      return {
        start: Number(item.start_time),
        end: Number(item.end_time),
        text: item.alternatives[0].content + punctuation,
        speaker: Number(item.speaker_label.replace(/[^0-9.]/g, "")),
      };
    })
    .filter((i: any) => i);
};
