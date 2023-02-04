import { AnimationProps, transformProps } from "./animations";

export const TextAlign = {
  left: "Left",
  center: "Center",
  right: "Right",
};
export const JustifyContent = {
  start: "Start",
  center: "Center",
  end: "End",
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
  iphone: "iPhone",
  samsung: "Samsung",
  macbook: "Macbook",
  macbook2: "Macbook 2",
  ipad: "iPad",
  watch: "Apple Watch",
  monitor: "Monitor",
  iphone14: "iPhone 14",
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
  bg?: Color;
  color?: BaseColor;
  outlineColor?: BaseColor;
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
  height?: number;
};

export type AudioProps = {
  comp: "audio";
  src: string;
  volume?: number;
  startFrom?: number;
};

export type AudiogramProps = {
  comp: "audiogram";
  src: string;
  position?: keyof typeof AudiogramPosition;
  gap?: number;
  barWidth: number;
  color?: Color;
  roundness?: number;
  startFrom?: number;
  smoothing?: boolean;
  mirror?: boolean;
  multiplier?: number;
  height: number;
  width: number;
};

export type DivProps = {
  comp: "div";
} & HasChildren;

export type GifProps = {
  comp: "gif";
  src: string;
  objectFit?: keyof typeof ObjectFit;
};

export type GraphProps = {
  comp: "graph";
  src: number[];
  color?: Color;
  type: keyof typeof GraphTypes;
  max?: number;
  min?: number;
  animationStart?: number;
  animationDuration?: number;
  strokeWidth?: number;
  gap?: number;
  roundness?: number;
  width: number;
  height: number;
};
export type ImageProps = {
  comp: "image";
  src: string;
  objectFit?: keyof typeof ObjectFit;
};

export type LottieProps = {
  comp: "lottie";
  src: string;
  backwards?: boolean;
  loop?: boolean;
  playbackRate?: number;
  bg?: Color;
};

export type MapProps = {
  comp: "map";
  lat: number;
  lng: number;
  zoom: number;
  fill?: Color;
  stroke?: BaseColor;
  strokeWidth?: number;
  markerColor?: Color;
  markerSize?: number;
  src?: string;
  bg?: Color;
};
export type HasChildren = {
  childIds: string[];
  isSequence?: boolean;
  bg?: Color;
  comps?: ComponentProps[];
};

export type MockupProps = {
  comp: "mockup";
  type: keyof typeof MockupTypes;
} & HasChildren;
export type PathProps = {
  comp: "path";
  path: string;
  stroke?: BaseColor;
  strokeWidth?: number;
  viewBoxX?: number;
  viewBoxY?: number;
  viewBoxHeight?: number;
  viewBoxWidth?: number;
  fill?: Color;
  isRound?: boolean;
};

export type QRCodeProps = {
  comp: "qrcode";
  text: string;
  color?: Color;
  bg?: Color;
};

export type ConfettiProps = {
  comp: "confetti";
  colors?: BaseColor[];
  count?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  scalar?: number;
  ticks?: number;
  posX: number;
  posY: number;
};

export type TextProps = {
  comp: "text";
  textStyle: TextStyle;
  text: string;
  justifyContent?: keyof typeof JustifyContent;
};

export type VideoProps = {
  comp: "video";
  src: string;
  objectFit?: keyof typeof ObjectFit;
  startFrom?: number;
  muted?: boolean;
  volume?: number;
  offthread?: boolean;
};

export type ProgressbarProps = {
  comp: "progressbar";
  type: keyof typeof ProgressbarTypes;
  color?: Color;
  bg?: Color;
  barWidth?: number;
  topRight?: boolean;
  width: number;
  height: number;
};

export const ShapeTypes = {
  rect: "Rectangle",
  triangle: "Triangle",
  circle: "Circle",
  ellipse: "Ellipse",
};

export const TriangleDirection = {
  up: "Up",
  down: "Down",
  left: "Left",
  right: "Right",
};

export type ShapeProps = {
  comp: "shape";
  type: keyof typeof ShapeTypes;
  fill?: Color;
  stroke?: BaseColor;
  strokeWidth: number;
  width: number;
  height: number;
} & (
  | {
      type: "triangle" | "rect";
      cornerRadius?: number;
      edgeRoundness?: number;
      direction?: keyof typeof TriangleDirection;
    }
  | { type: "circle" | "ellipse" }
);

export type MotionBlurProps = {
  layers?: number;
  lag?: number;
  opacity?: number;
};

export type BasicColor = {
  type: "basic";
  color?: string;
};
export type ColorInterpolate = {
  type: "interpolate";
  colors?: {
    color?: string;
    start?: number;
  }[];
};
export type GradientColor = {
  type: "linear" | "radial";
  gradients?: {
    color?: BaseColor;
    stop?: number;
  }[];
  angle?: number;
};

export type BaseColor = BasicColor | ColorInterpolate;
export type Color = BaseColor | GradientColor;

export type TransformProps = {
  prop: keyof typeof transformProps;
  value?: number;
};
export type CompInput = {
  id: string;
  prop: string;
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
  animations?: {
    byIds: {
      [id: string]: AnimationProps;
    };
    allIds: string[];
  };
  motionBlur?: MotionBlurProps;
  transform?: TransformProps[];
  freeze?: number;
  loopDuration?: number;
  parentId?: string;
  compInputs?: CompInput[];
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
  | PathProps
  | ConfettiProps
  | ShapeProps;

export type ComponentProps = BaseProps & AllComponents;
export const inputTypes = {
  image: "image",
  video: "video",
  gif: "gif",
  text: "text",
  number: "number",
  color: "color",
  checkbox: "checkbox",
  textarea: "textarea",
  select: "select",
  style: "style",
};

export type Input = {
  id: string;
  label?: string;
  type?: keyof typeof inputTypes;
  value?: any;
};
export type Components = { [key: string]: ComponentProps };
export type Inputs = { byIds: { [key: string]: Input }; allIds: string[] };
export type TemplateType = {
  width: number;
  height: number;
  duration: number;
  fps: number;
  inputs?: Inputs;
  components: Components;
  templateInputs?: CompInput[];
} & HasChildren;
