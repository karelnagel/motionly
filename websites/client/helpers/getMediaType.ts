import { MediaType } from "../types";

export const getMediaType = (type: string): MediaType | undefined => {
    if (type.includes("video")) return "VIDEO";
    if (type.includes("gif")) return "GIF";
    if (type.includes("image")) return "IMAGE";
    if (type.includes("audio")) return "AUDIO";
    return undefined;
  };