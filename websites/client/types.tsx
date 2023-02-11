import { TemplateType } from "@motionly/base";
import { NextApiRequest, NextApiResponse } from "next";
import { ISODateString } from "next-auth";
import { z } from "zod";

export type ReqRes = { req: NextApiRequest; res: NextApiResponse };

export type SessionWithId = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
};

export const Project = z.object({
  template: z.any(),
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
export const MediaTabs = {
  video: "Video",
  image: "Image",
  audio: "Audio",
  gif: "GIF",
};
export type MediaTabs = keyof typeof MediaTabs;
