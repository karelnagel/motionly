import { Gif as RemotionGif, GifFillMode } from "@remotion/gif";
import { StyleAndClass } from "@asius/base";
import { GifProps } from "@asius/base";

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
      fit={objectFit as GifFillMode}
      style={{
        height: "100%",
        width: "100%",
        ...style,
      }}
    />
  );
};
