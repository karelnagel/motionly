import { Img } from "remotion";
import { ImageCompProps } from "@asius/types";

export const ImageComp = ({ src, objectFit }: ImageCompProps) => {
  return (
    <Img
      src={src}
      draggable={false}
      style={{
        height: "100%",
        width: "100%",
        objectFit,
      }}
    />
  );
};
