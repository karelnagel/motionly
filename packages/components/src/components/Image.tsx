import { Img } from "remotion";
import { StyleAndClass } from "@motionly/base";
import { ImageProps } from "@motionly/base";
import { getSrc } from "../helpers/getSrc";

export const defaultImageProps: ImageProps = {
  comp: "image",
  objectFit: "cover",
  src: "https://picsum.photos/seed/motionly/1080/1080",
};

export const Image = ({ src, objectFit, style, className }: ImageProps & StyleAndClass) => {
  if (!src) return null;
  return (
    <Img
      src={getSrc(src)}
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
