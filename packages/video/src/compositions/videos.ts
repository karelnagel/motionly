import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "video",
  src: videoUrl,
  objectFit: "cover",
};

export const videos: CompProps[] = [
  {
    ...base,
    id: "cover",
  },
  {
    ...base,
    id: "contain",
    objectFit: "contain",
  },
  {
    ...base,
    id: "fill",
    objectFit: "fill",
  },
];
