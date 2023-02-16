import { TemplateType } from "@motionly/base";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export type ReqRes = { req: NextApiRequest; res: NextApiResponse };
export const RenderProgress = z.object({
  id: z.string(),
  progress: z.number(),
  status: z.enum(["FAILED", "COMPLETED", "PROCESSING"]),
  type: z.enum(["STILL", "MEDIA"]),
  cost: z.number(),
  fileUrl: z.string().nullable(),
});
export type RenderProgress = z.infer<typeof RenderProgress>;

export const Project = z.object({
  template: TemplateType,
  name: z.string(),
  description: z.string(),
  preview: z.string().optional(),
  public: z.boolean().optional(),
  id: z.string().optional(),
  isOwner: z.boolean().optional(),
});

export type Project = z.infer<typeof Project>;

export const MediaType = z.enum(["VIDEO", "IMAGE", "AUDIO", "GIF"]);
export const MediaTypeLabels: { [key in MediaType]: string } = {
  VIDEO: "Video",
  IMAGE: "Image",
  AUDIO: "Audio",
  GIF: "GIF",
};
export type MediaType = z.infer<typeof MediaType>;

export const ImageFormat = z.enum(["jpeg", "png"]);
export type ImageFormat = z.infer<typeof ImageFormat>;

export const Transcript = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
  speaker: z.number().optional(),
});
export type Transcript = z.infer<typeof Transcript>;
export const TranscriptionStatus = z.enum([
  "COMPLETED",
  "FAILED",
  "PROCESSING",
]);
export type TranscriptionStatus = z.infer<typeof TranscriptionStatus>;
export const Transcription = z.object({
  id: z.string(),
  status: TranscriptionStatus,
  text: z.string().nullable(),
  transcript: z.array(Transcript).nullable(),
  language: z.string().nullable(),
  persons: z.number().nullable(),
  fileId: z.string(),
});
export type Transcription = z.infer<typeof Transcription>;

export const UserFile = z.object({
  id: z.string(),
  name: z.string(),
  type: MediaType,
  url: z.string().url(),
});
export type UserFile = z.infer<typeof UserFile>;
export const FileWithTranscription = UserFile.extend({
  transcription: Transcription.optional(),
});
