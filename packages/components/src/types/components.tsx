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
  backgroundColor?: string;
  color?: string;
  outline?: {
    color?: string;
    width?: number;
  };
}

export const ObjectFit = {
  cover: "cover",
  contain: "contain",
  fill: "fill",
  none: "none",
  "scale-down": "scale-down",
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
export const TranscriptionScrollType = {
  "page-by-page": "Page by page",
  "line-by-line": "Line by line",
};
export interface TranscriptionAnimation {
  type: keyof typeof TranscriptionAnimationTypes;
  textStyle: TextStyle;
}
export interface TranscriptionProps {
  type: "transcription";
  words: TranscriptionWord[];
  textStyle: TextStyle;
  scrollType: keyof typeof TranscriptionScrollType;
  animation: TranscriptionAnimation;
}

export type AudioProps = {
  type: "audio";
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
  type: "audiogram";
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
  type: "div";
  background?: string;
  children: ComponentProps[];
};

export type GifProps = {
  type: "gif";
  src: string;
  objectFit: keyof typeof ObjectFit;
};

export const GraphTypes = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
};

export type GraphProps = {
  type: "graph";
  values: number[];
  color?: string;
  graphType: keyof typeof GraphTypes;
  max?: number;
  min?: number;
  animation?: {
    start: number;
    duration: number;
  };
} & (
  | {
      graphType: "line";
      strokeWidth: number;
    }
  | {
      graphType: "bar";
      gap?: number;
      roundness?: number;
    }
);

export type ImageProps = {
  type: "image";
  src: string;
  objectFit: keyof typeof ObjectFit;
};

export const LottieDirections = {
  forward: "Forward",
  backward: "Backward",
};
export type LottieProps = {
  type: "lottie";
  src: string;
  direction?: keyof typeof LottieDirections;
  loop?: boolean;
  playbackRate?: number;
  background?: string;
};

export type MapProps = {
  type: "map";
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  marker?: {
    color?: string;
    size?: number;
  };
  mapUrl?: string;
  background?: string;
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
  type: "mockup";
  children: ComponentProps[];
  mockupType: keyof typeof MockupTypes;
};

export const StrokeLinecap = {
  butt: "Butt",
  round: "Round",
  square: "Square",
};
export type PathProps = {
  type: "path";
  path: string;
  strokeColor?: string;
  strokeWidth?: number;
  viewBoxX?: number;
  viewBoxY?: number;
  viewBoxHeight?: number;
  viewBoxWidth?: number;
  fillColor?: string;
  strokeLinecap?: keyof typeof StrokeLinecap;
};

export type QRCodeProps = {
  type: "qrcode";
  text: string;
  color?: string;
  background?: string;
};

export const TextAnimationTypes = {
  "word-by-word": "Word by word",
  "letter-by-letter": "Letter by letter",
  "line-by-line": "Line by line",
};
export const TextAnimationAnimations = {
  "fade-in": "Fade in",
  "slide-up": "Slide up",
  "slide-down": "Slide down",
  "slide-left": "Slide left",
  "slide-right": "Slide right",
  scale: "Scale",
};
export type TextAnimation = {
  type: keyof typeof TextAnimationTypes;
  duration: number;
  animation: keyof typeof TextAnimationAnimations;
};
export type TextProps = {
  type: "text";
  textStyle: TextStyle;
  text: string;
  animation?: TextAnimation;
};

export type VideoProps = {
  type: "video";
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

export const ProgressbarSquareCorners = {
  "top-left": "Top left",
  "top-right": "Top right",
};

export type ProgressbarProps = {
  type: "progressbar";
  color?: string;
  background?: string;
} & (
  | {
      progressBarType: "square";
      barWidth: number;
      corner: keyof typeof ProgressbarSquareCorners;
    }
  | {
      progressBarType: "circle";
      barWidth: number;
    }
  | { progressBarType: "line" | "spotify" }
);

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
  // opacity: { label: "Opacity" },
  // borderRadius: { label: "borderRadius", units: "px" },
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
  componentAnimations?: AnimationProps[];
};

export type ComponentProps = BaseProps & AllComponents;
