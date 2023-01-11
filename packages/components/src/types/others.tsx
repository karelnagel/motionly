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
