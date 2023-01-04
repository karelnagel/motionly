import { Img } from "remotion";
import { ObjectFitType, StyleAndClass } from "../types";

export type ImageProps = {
  type: "image";
  src: string;
  objectFit: ObjectFitType;
};

export const defaultImageProps: ImageProps = {
  type: "image",
  objectFit: "cover",
  src: "https://picsum.photos/seed/asius/1080/1080",
};

export const Image = ({
  src,
  objectFit,
  style,
  className,
}: ImageProps & StyleAndClass) => {
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
