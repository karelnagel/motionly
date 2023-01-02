import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "div",
  x: 100,
  y: 100,
  background: "blue",
  height: 500,
  children: [],
};

export const divs: CompProps[] = [
  {
    ...base,
    id: "base",
  },
];
