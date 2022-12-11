import { OffthreadVideo, Video } from "remotion";
import { VideoCompProps } from "@asius/types";

export const VideoComp = ({ objectFit, offthread, ...others }: VideoCompProps) => {
  if (offthread)
    return (
      <OffthreadVideo
        {...others}
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
        {...others}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
};
