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
export const Template = z.object({
  width: z.number(),
  height: z.number(),
  fps: z.number(),
  duration: z.number(),
  inputs: z.any(),
  components: z.any(),
  bg: z.any(),
  childIds: z.array(z.string()),
  templateInputs: z.any(),
  isSequence: z.boolean().optional(),
  comps: z.any(),
});
export const Project = z.object({
  template: Template,
  name: z.string(),
  description: z.string(),
  preview: z.string().optional(),
  public: z.boolean().optional(),
  id: z.string().optional(),
  isOwner: z.boolean().optional(),
});

export type Project = Omit<z.infer<typeof Project>, "template"> & {
  template: TemplateType;
};
export const MediaType = z.enum(["VIDEO", "IMAGE", "AUDIO", "GIF"]);
export const MediaTypeLabels: { [key in MediaType]: string } = {
  VIDEO: "Video",
  IMAGE: "Image",
  AUDIO: "Audio",
  GIF: "GIF",
};
export type MediaType = z.infer<typeof MediaType>;
