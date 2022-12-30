import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
  ...baseComp,
  type: "mockup",
  mockupType: "iPhone",
  children: [{ ...baseComp, type: "image", src: videoUrl, objectFit: "cover" }],
};

export const mockups: CompProps[] = [
  {
    ...base,
    id: "iphone",
  },
  {
    ...base,
    id: "macbook",
    mockupType: "macbook",
  },
  {
    ...base,
    id: "apple-watch",
    mockupType: "apple-watch",
  },
  {
    ...base,
    id: "chrome",
    mockupType: "chrome",
  },
  {
    ...base,
    id: "ipad",
    mockupType: "iPad",
  },
  {
    ...base,
    id: "vscode",
    mockupType: "vs-code",
  },
];
