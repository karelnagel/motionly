import { Img } from "remotion";
import { ImageProps } from "@asius/types";

export const Image = ({ src, objectFit }: ImageProps) => {
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
