export interface StyleAndClass {
  style?: React.CSSProperties;
  className?: string;
}

export type ProgressStatus = "rendering" | "done" | "error" | undefined;
