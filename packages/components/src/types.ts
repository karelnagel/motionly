import {
  TextProps,
  ImageProps,
  DivProps,
  VideoProps,
  AudioProps,
  AudiogramProps,
  TranscriptionProps,
  MockupProps,
  MapProps,
  GraphProps,
  ProgressbarProps,
  GifProps,
  PathProps,
  LottieProps,
  QRCodeProps,
} from "./components";

export interface StyleAndClass {
  style?: React.CSSProperties;
  className?: string;
}

export const ObjectFit = {
  cover: "cover",
  contain: "contain",
  fill: "fill",
  none: "none",
  "scale-down": "scale-down",
};

export type ObjectFitType = keyof typeof ObjectFit;

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

export interface SizeProps {
  width: number;
  height: number;
}

export type MediaProps = {
  modifications?: Partial<ComponentProps>[];
} & TemplateType;
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

export type ProgressStatus = "rendering" | "done" | "error" | undefined;

export interface AnimationType {
  label: string;
  units?: string;
}
export const AnimationTypes: { [key: string]: AnimationType } = {
  // opacity: { label: "Opacity" },
  // borderRadius: { label: "borderRadius", units: "px" },
  rotate: { label: "Rotate", units: "deg" },
  rotateX: { label: "Rotate X", units: "deg" },
  rotateY: { label: "Rotate Y", units: "deg" },
  rotateZ: { label: "Rotate Z", units: "deg" },
  scale: { label: "Scale" },
  scaleX: { label: "Scale X" },
  scaleY: { label: "Scale Y" },
  scaleZ: { label: "Scale Z" },
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
  type: string; //todo;
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

export type Modification = Partial<ComponentProps>;

export interface SpringInput {
  frame: number;
  fps: number;
  durationInFrames?: number;
  startInFrames?: number;
  endInFrames?: number;
  from?: number;
  to?: number;
  mass?: number;
  damping?: number;
  stiffness?: number;
  reverse?: boolean;
}
export interface SpringHookInput {
  start?: number;
  end?: number;
  from?: number;
  to?: number;
  duration?: number;
  mass?: number;
  damping?: number;
  stiffness?: number;
  reverse?: boolean;
}
