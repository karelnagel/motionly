/* eslint-disable @next/next/no-img-element */
"use client";
import { ImageType } from "@imageapi/types";

export const Image = ({ element }: { element: ImageType }) => {
  return (
    <img
      src={element.src}
      draggable={false}
      alt=""
      style={{
        height: "100%",
        width: "100%",
        objectFit: element.objectFit || "cover",
        borderRadius: `${element.borderRadius || 0}px`,
      }}
    />
  );
};
