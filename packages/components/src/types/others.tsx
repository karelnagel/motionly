import { ComponentProps, TemplateType } from "./components";

export type Modification = Partial<ComponentProps>;
export interface StyleAndClass {
  style?: React.CSSProperties;
  className?: string;
}

export type MediaProps = {
  modifications?: Modification[];
} & TemplateType;

export type ProgressStatus = "rendering" | "done" | "error" | undefined;

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
