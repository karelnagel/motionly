import { AnimationProps } from "./animations";

export const TextAlign = {
  left: "Left",
  center: "Center",
  right: "Right",
};

export const ObjectFit = {
  cover: "cover",
  contain: "contain",
  fill: "fill",
  none: "none",
};
export const TranscriptionAnimationTypes = {
  "current-word": "Current word",
  "previous-text": "Previous text",
};
export const AudiogramPosition = {
  start: "Start",
  end: "End",
  center: "Center",
};
export const GraphTypes = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
};
export const MockupTypes = {
  iPhone: "iPhone",
  chrome: "Chrome",
  macbook: "Macbook",
  iPad: "iPad",
  "apple-watch": "Apple Watch",
  "vs-code": "VS Code",
};
export const ProgressbarTypes = {
  spotify: "Spotify",
  line: "Line",
  circle: "Circle",
  square: "Square",
};

export interface TranscriptionWord {
  text: string;
  start: number;
  end: number;
}

// Actual types
export type TextStyle = {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: number;
  textAlign?: keyof typeof TextAlign;
  bg?: string;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
};

export type TranscriptionProps = {
  comp: "transcription";
  src: TranscriptionWord[];
  startFrom?: number;
  textStyle: TextStyle;
  scrollByPage?: boolean;
  animationType: keyof typeof TranscriptionAnimationTypes;
  animationStyle: TextStyle;
};

export type AudioProps = {
  comp: "audio";
  src: string;
  volume: number;
  startFrom: number;
};

export type AudiogramProps = {
  comp: "audiogram";
  src: string;
  position: keyof typeof AudiogramPosition;
  gap: number;
  barWidth: number;
  color?: string;
  roundness: number;
  startFrom?: number;
  smoothing?: boolean;
  mirror?: boolean;
  multiplier?: number;
};

export type DivProps = {
  comp: "div";
  bg?: string;
  children: ComponentProps[];
};

export type GifProps = {
  comp: "gif";
  src: string;
  objectFit: keyof typeof ObjectFit;
};

export type GraphProps = {
  comp: "graph";
  src: number[];
  color?: string;
  type: keyof typeof GraphTypes;
  max?: number;
  min?: number;
  animationStart?: number;
  animationDuration?: number;
  strokeWidth?: number;
  gap?: number;
  roundness?: number;
};
export type ImageProps = {
  comp: "image";
  src: string;
  objectFit: keyof typeof ObjectFit;
};

export type LottieProps = {
  comp: "lottie";
  src: string;
  backwards?: boolean;
  loop?: boolean;
  playbackRate?: number;
  bg?: string;
};

export type MapProps = {
  comp: "map";
  lat: number;
  lng: number;
  zoom: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  markerColor?: string;
  markerSize?: number;
  url?: string;
  bg?: string;
};

export type MockupProps = {
  comp: "mockup";
  children: ComponentProps[];
  type: keyof typeof MockupTypes;
};

export type PathProps = {
  comp: "path";
  path: string;
  strokeColor?: string;
  strokeWidth?: number;
  viewBoxX?: number;
  viewBoxY?: number;
  viewBoxHeight?: number;
  viewBoxWidth?: number;
  fillColor?: string;
  isRound?: boolean;
};

export type QRCodeProps = {
  comp: "qrcode";
  text: string;
  color?: string;
  bg?: string;
};

export type TextProps = {
  comp: "text";
  textStyle: TextStyle;
  text: string;
};

export type VideoProps = {
  comp: "video";
  src: string;
  objectFit: keyof typeof ObjectFit;
  startFrom?: number;
  muted?: boolean;
  volume?: number;
  offthread?: boolean;
};

export type ProgressbarProps = {
  comp: "progressbar";
  type: keyof typeof ProgressbarTypes;
  color?: string;
  bg?: string;
  barWidth?: number;
  topRight?: boolean;
};

export type TemplateType = {
  id?: string;
  width: number;
  height: number;
  duration: number;
  background?: string;
  fps: number;
  name?: string;
  public?: boolean;
  description?: string;
  preview?: string;
  comps: ComponentProps[];
  isOwner?: boolean;
};

export type BaseProps = {
  id: string;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  borderRadius?: number;
  rotation?: number;
  from?: number;
  duration?: number;
  opacity?: number;
  animations?: AnimationProps[];
};

export type AllComponents =
  | TextProps
  | ImageProps
  | DivProps
  | VideoProps
  | AudioProps
  | AudiogramProps
  | LottieProps
  | TranscriptionProps
  | MockupProps
  | MapProps
  | GraphProps
  | QRCodeProps
  | ProgressbarProps
  | GifProps
  | PathProps;

export type ComponentProps = BaseProps & AllComponents;
