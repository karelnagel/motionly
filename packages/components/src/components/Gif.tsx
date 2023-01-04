import { Gif as RemotionGif } from "@remotion/gif";
import { ObjectFitType, StyleAndClass } from "../types";

export type GifProps = {
  type: "gif";
  src: string;
  objectFit: ObjectFitType;
};

export const defaultGifProps: GifProps = {
  type: "gif",
  src: "https://media.giphy.com/media/3o7TKsQ8UQ0MnL9nDa/giphy.gif",
  objectFit: "cover",
};

export const Gif = ({ src, objectFit, style }: GifProps & StyleAndClass) => {
  return (
    <RemotionGif
      src={src}
      style={{
        height: "100%",
        width: "100%",
        objectFit,
        ...style,
      }}
    />
  );
};
