import { staticFile } from "remotion";

export const getSrc = (src: string) => {
  if (src.startsWith("/")) return staticFile(src);
  return src;
};
