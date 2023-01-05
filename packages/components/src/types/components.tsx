import { SpringHookInput } from "./others";

export const TextAlign = {
  left: "Left",
  center: "Center",
  right: "Right",
};

export interface TextStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: number;
  textAlign?: keyof typeof TextAlign;
  bg?: string;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
}

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
export interface TranscriptionWord {
  text: string;
  start: number;
  end: number;
}
export interface TranscriptionProps {
  comp: "transcription";
  src: TranscriptionWord[];
  textStyle: TextStyle;
  scrollByPage?: boolean;
  animationType: keyof typeof TranscriptionAnimationTypes;
  animationStyle: TextStyle;
}

export type AudioProps = {
  comp: "audio";
  src: string;
  volume: number;
  startFrom: number;
};

export const AudiogramPosition = {
  start: "Start",
  end: "End",
  center: "Center",
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

export const GraphTypes = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
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

export const MockupTypes = {
  iPhone: "iPhone",
  chrome: "Chrome",
  macbook: "Macbook",
  iPad: "iPad",
  "apple-watch": "Apple Watch",
  "vs-code": "VS Code",
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

export const ProgressbarTypes = {
  spotify: "Spotify",
  line: "Line",
  circle: "Circle",
  square: "Square",
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
  fps: number;
  name?: string;
  public?: boolean;
  description?: string;
  comps: ComponentProps[];
  isOwner?: boolean;
};

export const AnimationTypes = {
  rotate: { label: "Rotate", units: "deg" },
  rotateX: { label: "Rotate X", units: "deg" },
  rotateY: { label: "Rotate Y", units: "deg" },
  rotateZ: { label: "Rotate Z", units: "deg" },
  scale: { label: "Scale", units: undefined },
  scaleX: { label: "Scale X", units: undefined },
  scaleY: { label: "Scale Y", units: undefined },
  scaleZ: { label: "Scale Z", units: undefined },
  translate: { label: "Translate", units: "px" },
  translateX: { label: "Translate X", units: "px" },
  translateY: { label: "Translate Y", units: "px" },
  translateZ: { label: "Translate Z", units: "px" },
  skew: { label: "Skew", units: "deg" },
  skewX: { label: "Skew X", units: "deg" },
  skewY: { label: "Skew Y", units: "deg" },
  perspective: { label: "Perspective", units: "px" },
};
export interface AnimationProps extends SpringHookInput {
  type: keyof typeof AnimationTypes;
}

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

export type ComponentProps = BaseProps & AllComponents;
