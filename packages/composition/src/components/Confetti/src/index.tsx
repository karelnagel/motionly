import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { confettiCannon } from "./confetti";
import type { IConfettiOptions } from "./interfaces";

export type ConfettiConfig = Omit<IConfettiOptions, "width" | "height">;

export const Confetti = ({
  style,
  ...confettiConfig
}: ConfettiConfig & {
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const video = useVideoConfig();

  const [handle] = useState(() => delayRender("Initializing confetti"));
  const [instantiated, setInstantiated] = useState(false);

  const ref = useRef<HTMLCanvasElement>(null);

  const stringifiedConfig = useMemo(
    () => JSON.stringify(confettiConfig),
    [confettiConfig]
  );

  const confettiInstance = useMemo(() => {
    if (!instantiated) {
      return null;
    }

    const config = JSON.parse(stringifiedConfig) as IConfettiOptions;
    const conf = confettiCannon(ref.current as HTMLCanvasElement);
    conf.fire({
      ...config,
      width: video.width,
      height: video.height,
    });

    return conf;
  }, [instantiated, stringifiedConfig, video.height, video.width]);

  useEffect(() => {
    if (confettiInstance) {
      confettiInstance.frame(frame);
    }
  }, [confettiInstance, frame]);

  useEffect(() => {
    setInstantiated(true);
    continueRender(handle);
  }, [handle]);

  const cssStyle: React.CSSProperties = useMemo(() => {
    return {
      width: video.width,
      height: video.height,
      position: "absolute",
      ...(style ?? {}),
    };
  }, [video.height, video.width, style]);

  return (
    <canvas
      ref={ref}
      width={video.width}
      height={video.height}
      style={cssStyle}
    />
  );
};

export default Confetti;
