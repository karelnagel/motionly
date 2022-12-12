import { OffthreadVideo, Video } from "remotion";
import { VideoCompProps } from "@asius/types";

export const VideoComp = ({
  objectFit,
  offthread,
  muted,
  startFrom,
  volume,
  src,
}: VideoCompProps) => {
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
      <Video
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
};
