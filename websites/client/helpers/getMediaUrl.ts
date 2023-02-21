import { env } from "../env.mjs";

export const getMediaUrl = (id: string) =>
  `${env.NEXT_PUBLIC_URL}/api/files/${id}`;
