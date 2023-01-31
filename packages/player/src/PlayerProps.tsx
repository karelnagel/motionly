import { TemplateType } from "@motionly/base";
import { PlayerRef } from "@remotion/player";
import { CSSProperties, ReactNode, RefObject } from "react";

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
  playerRef?: RefObject<PlayerRef>;
};
