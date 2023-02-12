import { env } from "../env.mjs";
import { FileType } from "../hooks/useFiles";

export const getFileType = (key: string): FileType => {
  const ending = key.toLowerCase().split(".").pop();
  if (!ending) return;
  if (["mp4", "mkv", "mp3", "avi", "flv", "mkv", "webm"].includes(ending))
    return "video";
  else if (["png", "jpg", "jpeg", "svg", "ico", "webp"].includes(ending))
    return "image";
  else if (["gif"].includes(ending)) return "gif";
};

export const getMediaUrl = (key: string) => {
  return `https://${env.MEDIA_BUCKET}.s3.amazonaws.com/${key}`;
};
