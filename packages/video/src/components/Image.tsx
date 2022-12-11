import { Img } from "remotion";
import { ImageCompProps } from "@asius/types";

export const ImageComp = (props: ImageCompProps) => {
  return (
    <Img
      src={props.src}
      draggable={false}
      alt=""
      style={{
        height: "100%",
        width: "100%",
        objectFit: props.objectFit,
      }}
    />
  );
};
