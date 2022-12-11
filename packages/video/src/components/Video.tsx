import { OffthreadVideo } from "remotion";
import { VideoCompProps } from "@asius/types";

export const VideoComp = (props: VideoCompProps) => {
  return (
    <OffthreadVideo
      src={props.src}
      startFrom={props.startFrom}
      volume={props.volume}
      style={{
        height: "100%",
        width: "100%",
        objectFit: props.objectFit,
      }}
    />
  );
};
