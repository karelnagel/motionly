import { Img } from "remotion";
import { StyleAndClass } from "@motionly/base";
import { getSrc } from "../helpers/getSrc";
import { Component } from "..";
import { z } from "zod";
import { ObjectFit } from "../helpers/zod";

const ImageProps = z.object({
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
});
type ImageProps = z.infer<typeof ImageProps>;

export const image: Component<ImageProps> = {
  type: "image",
  zod: ImageProps,
  inputs: {
    src: { text: { label: "Source" } },
    objectFit: { text: { label: "Object Fit" } },
  },
  component: ({ src, objectFit }) => {
    return (
      <Img
        src={getSrc(src)}
        draggable={false}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
  },
};
