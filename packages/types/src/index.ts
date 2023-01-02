import { CompProps } from "./components";

export * from "./defaults/image";
export * from "./defaults/components";
export * from "./components";
export * from "./defaults";
export * from "./applyModifications";

export interface SizeProps {
  width: number;
  height: number;
}
export type VideoInput = {
  modifications?: Partial<CompProps>[];
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
  comps: CompProps[];
  isOwner?: boolean;
};

export type ProgressStatus = "rendering" | "done" | "error" | undefined
