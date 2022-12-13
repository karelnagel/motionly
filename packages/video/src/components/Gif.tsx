import { Gif } from "@remotion/gif";
import { GifCompProps } from "@asius/types";

export const GifComp = ({ src, objectFit }: GifCompProps) => {
  return (
    <Gif
      src={src}
      style={{
        height: "100%",
        width: "100%",
        objectFit,
      }}
    />
  );
};
