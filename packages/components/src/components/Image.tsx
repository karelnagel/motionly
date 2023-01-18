import { Img } from "remotion";
import { StyleAndClass } from "../types";
import { ImageProps } from "../types/components";

export const defaultImageProps: ImageProps = {
  comp: "image",
  objectFit: "cover",
  src: "https://picsum.photos/seed/asius/1080/1080",
};

export const Image = ({
  src,
  objectFit,
  style,
  className,
}: ImageProps & StyleAndClass) => {
  if (!src) return null;
  return (
    <Img
      src={src}
      draggable={false}
      className={className}
      style={{
        height: "100%",
        width: "100%",
        objectFit,
        ...style,
      }}
    />
  );
};
