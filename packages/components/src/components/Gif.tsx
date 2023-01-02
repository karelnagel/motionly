import { Gif as RemotionGif } from "@remotion/gif";
import { GifProps } from "@asius/types";

export const Gif = ({ src, objectFit }: GifProps) => {
  return (
    <RemotionGif
      src={src}
      style={{
        height: "100%",
        width: "100%",
        objectFit,
      }}
    />
  );
};
