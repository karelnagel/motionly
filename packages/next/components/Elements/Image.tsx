/* eslint-disable @next/next/no-img-element */
"use client";
import { Img } from "remotion";
import { ImageCompProps } from "../../types";

export const ImageComp = (props: ImageCompProps) => {
  return (
    <Img
      src={props.src}
      draggable={false}
      alt=""
      style={{
        height: "100%",
        width: "100%",
        objectFit: props.objectFit,
        borderRadius: `${props.borderRadius || 0}px`,
      }}
    />
  );
};
