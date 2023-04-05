import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { forwardRef } from "react";
import { CSSProperties, ReactNode } from "react";
import { Template, Composition } from "../composition";

export type PlayerControls = {
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
};

export type PlayerProps = PlayerControls & {
  template: Template;
  setComponent?: (id?: string) => void;
  component?: string;
  selectedRef?: React.RefObject<HTMLDivElement>;
};

export const Player = forwardRef<PlayerRef, PlayerProps>(
  ({ template, loading, setComponent = () => undefined, component, selectedRef, ...props }, ref) => {
    return (
      <RemotionPlayer
        ref={ref}
        component={Composition}
        fps={template.fps}
        durationInFrames={Math.ceil((template.duration || 1) * template.fps)}
        inputProps={{ component, setComponent, template }}
        compositionHeight={template.height}
        compositionWidth={template.width}
        {...props}
      />
    );
  }
);
