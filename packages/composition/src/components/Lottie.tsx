import {
  Lottie as RemotionLottie,
  LottieAnimationData,
} from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { StyleAndClass } from "@motionly/base";
import { LottieProps } from "@motionly/base";
import { useColor } from "../hooks/useColor";
import { getSrc } from "../helpers";

export const defaultLottieProps: LottieProps = {
  comp: "lottie",
  src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
  loop: true,
};

export const Lottie = ({
  src,
  loop,
  playbackRate,
  style,
  className,
  bg,
  backwards,
}: LottieProps & StyleAndClass) => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const background = useColor(bg);
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);
  useEffect(() => {
    if (!src) return;

    fetch(getSrc(src))
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
      className={className}
      style={{
        height: "100%",
        width: "100%",
        background,
        ...style,
      }}
      animationData={animationData}
      direction={backwards ? "backward" : "forward"}
      loop={loop}
      playbackRate={playbackRate}
    />
  );
};
