import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "audio",
  src: videoUrl,
  startFrom: 0,
  volume: 1,
};

export const audios: CompProps[] = [
  {
    ...base,
    id: "base",
  },
  {
    ...base,
    id: "startfrom-5",
    startFrom: 5,
  },
  {
    ...base,
    id: "volume-half",
    volume: 0.5,
  },
];
