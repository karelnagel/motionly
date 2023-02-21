import { MediaType } from "../types";

export const getMediaType = (type2: string): MediaType | undefined => {
  const type = type2.toLowerCase();
  if (type.includes("VIDEO")) return "VIDEO";
  if (type.includes("GIF")) return "GIF";
  if (type.includes("IMAGE")) return "IMAGE";
  if (type.includes("AUDIO")) return "AUDIO";
  return undefined;
};
