import { Img } from "remotion";
import { ObjectFitType } from "../types";

export type ImageProps = {
  type: "image";
  src: string;
  objectFit: ObjectFitType;
};

export const defaultImageProps: ImageProps = {
  type: "image",
  objectFit: "cover",
  src: "https://picsum.photos/seed/df/500/500",
};

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
