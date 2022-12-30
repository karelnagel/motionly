import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { LottieCompProps } from "@asius/types";

export const LottieComp = ({
  src,
  direction,
  loop,
  playbackRate,
}: LottieCompProps) => {
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
  }, [handle]);
  if (!animationData) {
    return null;
  }
  return (
    <Lottie
      animationData={animationData}
      direction={direction}
      loop={loop}
      playbackRate={playbackRate}
    />
  );
};
