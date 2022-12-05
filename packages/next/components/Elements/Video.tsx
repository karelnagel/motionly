/* eslint-disable @next/next/no-img-element */
"use client";
import { VideoType } from "@imageapi/types";
import { OffthreadVideo } from "remotion";

export const Video = ({ element }: { element: VideoType }) => {
  return (
    <OffthreadVideo
      src={element.src}
      startFrom={element.startFrom}
      style={{
        height: "100%",
        width: "100%",
        objectFit: element.objectFit,
        borderRadius: `${element.borderRadius || 0}px`,
      }}
    />
  );
};
