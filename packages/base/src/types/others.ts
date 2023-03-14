import { CSSProperties } from "react";

export interface StyleAndClass {
  style?: CSSProperties;
  className?: string;
}

export type ProgressStatus = "rendering" | "done" | "error" | undefined;
