import { ObjectFit } from "@motionly/inputs";
import { OffthreadVideo, useVideoConfig, Video as RemotionVideo } from "remotion";
import { z } from "zod";
import { Component } from "..";
import { getSrc } from "../helpers/getSrc";
import { MdVideoLibrary } from "react-icons/md";

export const VideoProps = z.object({
  src: z.string().url().optional(),
  objectFit: ObjectFit.optional(),
  startFrom: z.number().min(0).optional(),
  muted: z.boolean().optional(),
  volume: z.number().min(0).max(1).optional(),
  offthread: z.boolean().optional(),
});
export type VideoProps = z.infer<typeof VideoProps>;

export const video: Component<VideoProps> = {
  zod: VideoProps,
  Icon: MdVideoLibrary,
  hue: 134,
  inputs: {
    src: { text: { label: "Source" } },
    objectFit: { select: { label: "Object Fit", options: "object-fit" } },
  },
  component: ({ src, objectFit, muted, offthread, startFrom, volume }) => {
    const { fps } = useVideoConfig();
    const props = { src: getSrc(src), muted, volume, startFrom: startFrom ? Math.ceil(startFrom * fps) : undefined };
    if (!src) return null;
    if (offthread)
      return (
        <OffthreadVideo
          {...props}
          style={{
            height: "100%",
            width: "100%",
            objectFit,
          }}
        />
      );
    else
      return (
        <RemotionVideo
          {...props}
          disablePictureInPicture
          style={{
            height: "100%",
            width: "100%",
            objectFit,
          }}
        />
      );
  },
};
