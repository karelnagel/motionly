import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { forwardRef, useEffect } from "react";
import { CSSProperties, ReactNode } from "react";
import { Template, Composition, useCompositionStore } from "../composition";

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
  setSelected?: (id: string) => void;
  selected?: string;
  selectedRef?: React.RefObject<HTMLDivElement>;
};

export const Player = forwardRef<PlayerRef, PlayerProps>(
  ({ template, loading, setSelected = () => undefined, selected, selectedRef, ...props }, ref) => {
    const init = useCompositionStore((s) => s.init);
    useEffect(() => {
      init(template, selected);
    }, [template, selected]);
    return (
      <RemotionPlayer
        ref={ref}
        component={Composition}
        fps={template.fps}
        durationInFrames={Math.ceil((template.duration || 1) * template.fps)}
        inputProps={template}
        compositionHeight={template.height}
        compositionWidth={template.width}
        {...props}
      />
    );
  }
);
