import { TemplateType } from "@motionly/base";
import { NextApiRequest, NextApiResponse } from "next";
import { ISODateString } from "next-auth";

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

export type Project = {
  isOwner?: boolean;
  public?: boolean;
  name: string;
  description: string;
  id?: string;
  preview?: string;
  template: TemplateType;
};
export const MediaTabs = {
  video: "Video",
  image: "Image",
  audio: "Audio",
  gif: "GIF",
};
export type MediaTabs = keyof typeof MediaTabs;
