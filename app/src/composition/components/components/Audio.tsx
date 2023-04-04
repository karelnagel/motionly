import { Audio as RemotionAudio, useVideoConfig } from "remotion";
import { getSrc } from "../../helpers/getSrc";
import { Component } from "..";
import { z } from "zod";
import { MdAudiotrack } from "react-icons/md";

export const AudioProps = z.object({
  src: z.string().url(),
  volume: z.number().min(0).max(1).optional(),
  startFrom: z.number().min(0).optional(),
});
export type AudioProps = z.infer<typeof AudioProps>;

export const audio: Component<AudioProps> = {
  zod: AudioProps,
  Icon: MdAudiotrack,
  hue: 50,
  inputs: {
    src: { text: { label: "Source" } },
    volume: { range: { label: "Volume", min: 0, max: 1, step: 0.1 } },
  },
  component: ({ src, startFrom, volume }) => {
    const { fps } = useVideoConfig();
    if (!src) return null;
    return <RemotionAudio startFrom={startFrom ? Math.floor(startFrom * fps) : undefined} src={getSrc(src)} volume={volume} />;
  },
};
