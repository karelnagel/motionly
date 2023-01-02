import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const values = [
  45, 79, 8, 28, 33, 97, 15, 4, 88, 11, 64, 73, 22, 56, 91, 6, 98, 78, 82, 62,
  12, 41, 59, 81, 94, 71, 20, 40, 65, 20,
];

const base: CompProps = {
  ...baseComp,
  type: "graph",
  values,
  graphType: "bar",
  gap: 2,
  color: "blue",
  animation: { duration: 10, start: 0 },
};

export const graphs: CompProps[] = [
  {
    ...base,
    id: "bar",
  },
  {
    ...base,
    id: "line",
    graphType: "line",
    strokeWidth: 10,
  },
];
