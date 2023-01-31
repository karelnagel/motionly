import { TemplateType } from "@motionly/base";
import { CSSProperties } from "react";

export type PlayerProps = {
  allowFullscreen?: boolean;
  autoPlay?: boolean;
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
};
