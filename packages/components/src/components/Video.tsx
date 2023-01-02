import { OffthreadVideo, Video as RemotionVideo } from "remotion";
import { VideoProps } from "@asius/types";

export const Video = ({
  objectFit,
  offthread,
  muted,
  startFrom,
  volume,
  src,
}: VideoProps) => {
  const props = { muted, startFrom, volume, src };
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
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
};
