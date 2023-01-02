import {
  Lottie as RemotionLottie,
  LottieAnimationData,
} from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { LottieProps } from "@asius/types";

export const Lottie = ({ src, direction, loop, playbackRate }: LottieProps) => {
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
