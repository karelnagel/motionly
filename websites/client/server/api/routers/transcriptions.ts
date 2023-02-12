import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import Transcribe from "aws-sdk/clients/transcribeservice";
import { awsClientConfig } from "../../../helpers/awsClientConfig";
import { TRPCError } from "@trpc/server";
import axios from "axios";

const Transcript = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
  speaker: z.number().optional(),
});
type Transcript = z.infer<typeof Transcript>;
const TranscriptionStatus = z.enum(["COMPLETED", "FAILED", "PROCESSING"]);
type TranscriptionStatus = z.infer<typeof TranscriptionStatus>;
export const Transcription = z.object({
  id: z.string(),
  status: TranscriptionStatus,
  text: z.string().optional(),
  transcript: z.array(Transcript).optional(),
  language: z.string().optional(),
  persons: z.number().optional(),
  mediaId: z.string(),
});
type Transcription = z.infer<typeof Transcription>;

const transcribe = new Transcribe(awsClientConfig);
const tags = ["Transcriptions"];
const protect = true;
export const transcriptions = createTRPCRouter({
  transcribe: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/media/{mediaId}/transcriptions/",
        tags,
        protect,
      },
    })
    .input(z.object({ mediaId: z.string() }))
    .output(z.object({}))
    .mutation(async ({ input, ctx }) => {
      const { mediaId } = input;
      const media = await ctx.prisma.file.findFirst({
        where: {
          id: mediaId,
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
        path: "/media/{mediaId}/transcriptions/progress",
        tags,
        protect,
      },
    })
    .input(z.object({ mediaId: z.string() }))
    .output(Transcription)
    .mutation(async ({ input: { mediaId }, ctx }) => {
      const transcription = await ctx.prisma.transcription.findFirst({
        where: {
          fileId: mediaId,
          file: { userId: ctx.session.user.id },
        },
      });

      if (!transcription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transcription not found",
        });
      }
      const res = await getTranscription(mediaId);
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
        mediaId,
        transcript: (newTrans.transcript as any) || undefined,
        text: newTrans.text || undefined,
        persons: newTrans.persons || undefined,
        language: newTrans.language || undefined,
        id: newTrans.id,
        status: newTrans.status,
      };
    }),
  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/media/{mediaId}/transcriptions/",
        tags,
        protect,
      },
    })
    .input(z.object({ mediaId: z.string() }))
    .output(Transcription)
    .mutation(async ({ input: { mediaId }, ctx }) => {
      const transcription = await ctx.prisma.transcription.findFirst({
        where: {
          fileId: mediaId,
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
          TranscriptionJobName: mediaId,
        })
        .promise();
      const deletedTrans = await ctx.prisma.transcription.delete({
        where: { id: transcription.id },
      });
      return {
        mediaId,
        transcript: (deletedTrans.transcript as any) || undefined,
        text: deletedTrans.text || undefined,
        persons: deletedTrans.persons || undefined,
        language: deletedTrans.language || undefined,
        id: deletedTrans.id,
        status: deletedTrans.status,
      };
    }),
});

const getTranscription = async (
  mediaId: string
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
        TranscriptionJobName: mediaId,
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
