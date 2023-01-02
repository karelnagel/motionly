import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "text",
  text: "Hello World",
  animation: { type: "letter-by-letter", duration: 1, animation: "scale" },
  textStyle: {
    fontSize: 100,
  },
  duration: 10,
};

export const texts: CompProps[] = [
  {
    ...base,
    id: "letter-scale",
  },
  {
    ...base,
    id: "letter-fade",
    animation: {
      type: "letter-by-letter",
      animation: "fade-in",
      duration: 2,
    },
  },
  {
    ...base,
    id: "letter-up",
    animation: {
      type: "letter-by-letter",
      animation: "slide-up",
      duration: 2,
    },
  },
  {
    ...base,
    id: "word-up",
    animation: { type: "word-by-word", animation: "slide-up", duration: 2 },
  },
  {
    ...base,
    id: "word-fade",
    animation: { type: "word-by-word", animation: "fade-in", duration: 2 },
  },
  {
    ...base,
    id: "line-fade",
    animation: { type: "line-by-line", animation: "fade-in", duration: 2 },
  },
  {
    ...base,
    id: "line-right",
    animation: {
      type: "line-by-line",
      animation: "slide-right",
      duration: 2,
    },
  },
];
