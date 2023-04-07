import { mockup } from "./Mockup";
import { transcription } from "./Transcription";
import { audio } from "./Audio";
import { audiogram } from "./Audiogram";
import { confetti } from "./Confetti";
import { gif } from "./Gif";
import { graph } from "./Graph";
import { image } from "./Image";
import { lottie } from "./Lottie";
import { map } from "./Map";
import { path } from "./Path";
import { progressbar } from "./Progressbar";
import { qrcode } from "./QRCode";
import { shape } from "./Shape";
import { text } from "./Text";
import { video } from "./Video";
import { z } from "zod";
import { Input } from "@motionly/inputs";
import { Comp } from "../types";

export type Component<T> = {
  zod: z.ZodType<T>;
  component: React.FC<T & { id: string }>;
  hue: number;
  Icon: React.FC;
  examples?: { props: Partial<Omit<Comp, "props">> & { props: T }; title: string; image?: string }[];
  inputs: { [key in keyof T]?: Input };
};

export const components = {
  mockup,
  transcription,
  audio,
  audiogram,
  confetti,
  gif,
  graph,
  image,
  lottie,
  map,
  path,
  progressbar,
  qrcode,
  shape,
  text,
  video,
};
