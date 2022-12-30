import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "gif",
  src: "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif",
  objectFit: "cover",
};

export const gifs: CompProps[] = [
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
