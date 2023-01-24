import {
  OffthreadVideo,
  useVideoConfig,
  Video as RemotionVideo,
} from "remotion";
import { videoUrl } from "@asius/base";
import { StyleAndClass } from "@asius/base";
import { VideoProps } from "@asius/base";

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
    src,
    className,
    muted,
    volume,
    startFrom: startFrom ? Math.round(startFrom * fps) : undefined,
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
        style={{
          height: "100%",
          width: "100%",
          objectFit,
          ...style,
        }}
      />
    );
};
