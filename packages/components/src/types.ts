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

export const AnimationTypes = {
  opacity: "Opacity",
  scale: "Scale",
  translateX: "Translate X",
  translateY: "Translate Y",
  rotate: "Rotate",
};
export interface AnimationProps {
  type: keyof typeof AnimationTypes;
  from: number;
  to: number;
  start: number;
  end: number;
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
  height: number;
  width: number;
  x: number;
  y: number;
  borderRadius: number;
  rotation: number;
  from: number;
  duration: number;
  componentAnimations?: AnimationProps[];
};

export type ComponentProps = BaseProps & AllComponents;

export type Modification = Partial<ComponentProps>;
