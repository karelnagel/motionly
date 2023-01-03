import {
  Lottie as RemotionLottie,
  LottieAnimationData,
} from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

export const LottieDirections = {
  forward: "Forward",
  backward: "Backward",
};
export type LottieProps = {
  type: "lottie";
  src: string;
  direction?: keyof typeof LottieDirections;
  loop?: boolean;
  playbackRate?: number;
};

export const defaultLottieProps: LottieProps = {
  type: "lottie",
  src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
  loop: true,
};

export const Lottie = ({
  src,
  direction: direction,
  loop: loop,
  playbackRate: playbackRate,
}: LottieProps) => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(src)
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Animation failed to load", err);
      });
  }, [handle, src]);
  if (!animationData) {
    return null;
  }
  return (
    <RemotionLottie
      animationData={animationData}
      direction={direction}
      loop={loop}
      playbackRate={playbackRate}
    />
  );
};
