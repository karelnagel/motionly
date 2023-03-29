import { CSSProperties, ReactNode } from "react";

export type PlayerProps = {
  allowFullscreen?: boolean;
  autoPlay?: boolean;
  loading?: ReactNode;
  clickToPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  doubleClickToFullscreen?: boolean;
  moveToBeginningWhenEnded?: boolean;
  initiallyShowControls?: boolean;
  spaceKeyToPlayOrPause?: boolean;
  showVolumeControls?: boolean;
  style?: CSSProperties;
  className?: string;
  template: TemplateType;
  setSelected?: (id: string) => void;
  selected?: string;
  selectedRef?: React.RefObject<HTMLDivElement>;
};
