import { Gif as RemotionGif } from "@remotion/gif";
import { StyleAndClass } from "../types";
import { GifProps } from "../types/components";

export const defaultGifProps: GifProps = {
  comp: "gif",
  src: "https://media.giphy.com/media/3o7TKsQ8UQ0MnL9nDa/giphy.gif",
  objectFit: "cover",
};

export const Gif = ({ src, objectFit, style }: GifProps & StyleAndClass) => {
  if (!src) return null;
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
