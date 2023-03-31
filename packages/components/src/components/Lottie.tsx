import { Lottie as RemotionLottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { getSrc } from "../helpers/getSrc";
import { z } from "zod";
import { Color } from "@motionly/inputs";
import { Component } from "..";
import { MdOutlineMotionPhotosOn } from "react-icons/md";

export const LottieProps = z.object({
  src: z.string(),
  backwards: z.boolean().optional(),
  loop: z.boolean().optional(),
  playbackRate: z.number().min(0).optional(),
  bg: Color.optional(),
});
export type LottieProps = z.infer<typeof LottieProps>;

export const lottie: Component<LottieProps> = {
  zod: LottieProps,Icon: MdOutlineMotionPhotosOn,
  hue: 240,
  inputs: {
    src: { text: { label: "Source" } },
    backwards: { checkbox: { label: "Backwards" } },
    loop: { checkbox: { label: "Loop" } },
    playbackRate: { number: { label: "Playback Rate" } },
    bg: { color: { label: "Background" } },
  },
  examples: [
    {
      title: "Line",
      image: "/logo.png",
      props: { props: { src: "https://assets5.lottiefiles.com/packages/lf20_81Rgekq0ps.json" } },
    },
    {
      title: "Check",
      image: "/logo.png",
      props: { props: { src: "https://assets10.lottiefiles.com/datafiles/uoZvuyyqr04CpMr/data.json" } },
    },
    {
      title: "Confetti",
      image: "/logo.png",
      props: { props: { src: "https://assets10.lottiefiles.com/datafiles/U1I3rWEyksM9cCH/data.json" } },
    },
    {
      title: "Star",
      image: "/logo.png",
      props: { props: { src: "https://assets10.lottiefiles.com/datafiles/0BklE7L1HhdHa4v/data.json" } },
    },
    {
      title: "Tiktok",
      image: "/logo.png",
      props: { props: { src: "https://assets1.lottiefiles.com/private_files/lf30_keymopaz.json" } },
    },
    {
      title: "youtube",
      image: "/logo.png",
      props: { props: { src: "https://assets9.lottiefiles.com/private_files/lf30_cwyafad8.json" } },
    },
  ],
  component: ({ src, backwards, bg, loop, playbackRate }) => {
    const [handle] = useState(() => delayRender("Loading Lottie animation"));
    const background = bg;
    const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
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
        style={{
          height: "100%",
          width: "100%",
          background,
        }}
        animationData={animationData}
        direction={backwards ? "backward" : "forward"}
        loop={loop}
        playbackRate={playbackRate}
      />
    );
  },
};
