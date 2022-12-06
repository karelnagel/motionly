/* eslint-disable @next/next/no-img-element */
"use client";
import { OffthreadVideo } from "remotion";
import { VideoCompProps } from "../../types";

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
