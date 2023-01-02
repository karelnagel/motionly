import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "audiogram",
  barWidth: 20,
  borderRadius: 0,
  color: "blue",
  gap: 10,
  roundness: 5,
  mirror: true,
  smoothing: true,
  src: videoUrl,
  position: "center",
};

export const audiograms: CompProps[] = [
  {
    ...base,
    id: "center",
  },
  {
    ...base,
    id: "end",
    position: "end",
  },
  {
    ...base,
    id: "start",
    position: "start",
  },
  {
    ...base,
    id: "no-mirror",
    mirror: false,
  },
  {
    ...base,
    id: "no-smoothing",
    smoothing: false,
  },
];
