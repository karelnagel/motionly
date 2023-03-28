import { MediaType } from "../types";

export const getMediaType = (type2: string): MediaType | undefined => {
  const type = type2.toLowerCase();
  if (type.includes("video")) return "VIDEO";
  if (type.includes("gif")) return "GIF";
  if (type.includes("image")) return "IMAGE";
  if (type.includes("audio")) return "AUDIO";
  return undefined;
};
