import { z } from "zod";
import { HasChildren } from "./enums";
import {
  BaseColor,
  Color,
  GraphTypes,
  JustifyContent,
  MockupTypes,
  ObjectFit,
  ProgressbarTypes,
  ShapeTypes,
  TextAlign,
  TranscriptionAnimationTypes,
  TriangleDirection,
} from "./enums";

export const TranscriptionWord = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
});
export type TranscriptionWord = z.infer<typeof TranscriptionWord>;

export const TextStyle = z.object({
  fontSize: z.number().min(0).optional(),
  fontFamily: z.string().optional(),
  fontWeight: z.string().min(0).optional(),
  lineHeight: z.number().min(0).max(10).optional(),
  textAlign: TextAlign.optional(),
  bg: Color.optional(),
  color: BaseColor.optional(),
  outlineColor: BaseColor.optional(),
  outlineWidth: z.number().min(0).optional(),
});
export type TextStyle = z.infer<typeof TextStyle>;
export const TranscriptionProps = z.object({
  comp: z.literal("transcription"),
  src: z.array(TranscriptionWord).or(z.string().url()),
  startFrom: z.number().min(0).optional(),
  textStyle: TextStyle,
  scrollByPage: z.boolean().optional(),
  animationType: TranscriptionAnimationTypes,
  animationStyle: TextStyle,
  height: z.number().min(0).optional(),
});
export type TranscriptionProps = z.infer<typeof TranscriptionProps>;

export const AudioProps = z.object({
  comp: z.literal("audio"),
  src: z.string().url(),
  volume: z.number().min(0).max(1).optional(),
  startFrom: z.number().min(0).optional(),
});
export type AudioProps = z.infer<typeof AudioProps>;

export const AudiogramProps = z.object({
  comp: z.literal("audiogram"),
  src: z.string().url(),
  position: JustifyContent.optional(),
  gap: z.number().optional(),
  barWidth: z.number().min(0),
  color: Color.optional(),
  roundness: z.number().min(0).optional(),
  startFrom: z.number().min(0).optional(),
  smoothing: z.boolean().optional(),
  mirror: z.boolean().optional(),
  multiplier: z.number().min(0).optional(),
  height: z.number().min(0),
  width: z.number().min(0),
});
export type AudiogramProps = z.infer<typeof AudiogramProps>;

export const DivProps = HasChildren.merge(
  z.object({
    comp: z.literal("div"),
    bg: Color.optional(),
  })
);
export type DivProps = z.infer<typeof DivProps>;
export const GifProps = z.object({
  comp: z.literal("gif"),
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
});
export type GifProps = z.infer<typeof GifProps>;

export const GraphProps = z.object({
  comp: z.literal("graph"),
  src: z.array(z.number()),
  color: Color.optional(),
  type: GraphTypes,
  max: z.number().optional(),
  min: z.number().optional(),
  animationStart: z.number().optional(),
  animationDuration: z.number().optional(),
  strokeWidth: z.number().optional(),
  gap: z.number().optional(),
  roundness: z.number().min(0).optional(),
  width: z.number().min(0),
  height: z.number().min(0),
});
export type GraphProps = z.infer<typeof GraphProps>;
export const ImageProps = z.object({
  comp: z.literal("image"),
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
});
export type ImageProps = z.infer<typeof ImageProps>;
export const LottieProps = z.object({
  comp: z.literal("lottie"),
  src: z.string(),
  backwards: z.boolean().optional(),
  loop: z.boolean().optional(),
  playbackRate: z.number().min(0).optional(),
  bg: Color.optional(),
});
export type LottieProps = z.infer<typeof LottieProps>;

export const MapProps = z.object({
  comp: z.literal("map"),
  lat: z.number(),
  lng: z.number(),
  zoom: z.number().min(0),
  fill: Color.optional(),
  stroke: BaseColor.optional(),
  strokeWidth: z.number().min(0).optional(),
  markerColor: Color.optional(),
  markerSize: z.number().min(0).optional(),
  src: z.string().url().optional(),
  bg: Color.optional(),
});
export type MapProps = z.infer<typeof MapProps>;

export const MockupProps = HasChildren.extend({
  comp: z.literal("mockup"),
  bg: Color.optional(),
  type: MockupTypes,
});
export type MockupProps = z.infer<typeof MockupProps>;

export const PathProps = z.object({
  comp: z.literal("path"),
  path: z.string(),
  stroke: BaseColor.optional(),
  strokeWidth: z.number().min(0).optional(),
  viewBoxX: z.number().optional(),
  viewBoxY: z.number().optional(),
  viewBoxHeight: z.number().min(0).optional(),
  viewBoxWidth: z.number().min(0).optional(),
  fill: Color.optional(),
  isRound: z.boolean().optional(),
});

export type PathProps = z.infer<typeof PathProps>;
export const QRCodeProps = z.object({
  comp: z.literal("qrcode"),
  text: z.string(),
  color: Color.optional(),
  bg: Color.optional(),
});
export type QRCodeProps = z.infer<typeof QRCodeProps>;
export const ConfettiProps = z.object({
  comp: z.literal("confetti"),
  colors: z.array(BaseColor).optional(),
  count: z.number().optional(),
  angle: z.number().optional(),
  spread: z.number().optional(),
  startVelocity: z.number().optional(),
  scalar: z.number().optional(),
  ticks: z.number().optional(),
  posX: z.number(),
  posY: z.number(),
});
export type ConfettiProps = z.infer<typeof ConfettiProps>;

export const TextProps = z.object({
  comp: z.literal("text"),
  textStyle: TextStyle,
  text: z.string(),
  justifyContent: JustifyContent.optional(),
});
export type TextProps = z.infer<typeof TextProps>;
export const VideoProps = z.object({
  comp: z.literal("video"),
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
  startFrom: z.number().min(0).optional(),
  muted: z.boolean().optional(),
  volume: z.number().min(0).max(1).optional(),
  offthread: z.boolean().optional(),
});
export type VideoProps = z.infer<typeof VideoProps>;
export const ProgressbarProps = z.object({
  comp: z.literal("progressbar"),
  type: ProgressbarTypes,
  color: Color.optional(),
  bg: Color.optional(),
  barWidth: z.number().min(0).optional(),
  topRight: z.boolean().optional(),
  width: z.number().min(0),
  height: z.number().min(0),
});
export type ProgressbarProps = z.infer<typeof ProgressbarProps>;

export const ShapeProps = z.object({
  comp: z.literal("shape"),
  fill: Color.optional(),
  stroke: BaseColor.optional(),
  strokeWidth: z.number().min(0).optional(),
  width: z.number().min(0),
  height: z.number().min(0),
  type: ShapeTypes,
  cornerRadius: z.number().optional(),
  edgeRoundness: z.number().optional(),
  direction: TriangleDirection.optional(),
});

export type ShapeProps = z.infer<typeof ShapeProps>;
