import {
  OffthreadVideo,
  useVideoConfig,
  Video as RemotionVideo,
} from "remotion";
import { videoUrl } from "@motionly/base";
import { StyleAndClass } from "@motionly/base";
import { VideoProps } from "@motionly/base";
import { getSrc } from "../helpers";

export const defaultVideoProps: VideoProps = {
  comp: "video",
  objectFit: "cover",
  startFrom: 0,
  src: videoUrl,
  muted: false,
  volume: 100,
};

export const Video = ({
  objectFit,
  offthread,
  style,
  src,
  className,
  muted,
  volume,
  startFrom,
}: VideoProps & StyleAndClass) => {
  const { fps } = useVideoConfig();
  const props = {
    src: getSrc(src),
    className,
    muted,
    volume,
    startFrom: startFrom ? Math.ceil(startFrom * fps) : undefined,
  };
  if (!src) return null;
  if (offthread)
    return (
      <OffthreadVideo
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
          ...style,
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
          ...style,
        }}
      />
    );
};
