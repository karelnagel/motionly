import { Gif as RemotionGif, GifFillMode } from "@remotion/gif";
import { getSrc } from "../helpers/getSrc";
import { z } from "zod";
import { ObjectFit } from "@motionly/inputs";
import { Component } from "..";
import { useState } from "react";

const Props = z.object({
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
});
type Props = z.infer<typeof Props>;

export const gif: Component<Props> = {
  zod: Props,
  inputs: {
    src: { text: { label: "Source" } },
    objectFit: { select: { label: "Object Fit", options: "object-fit" } },
  },
  component: ({ src, objectFit }) => {
    useState;
    return (
      <RemotionGif
        src={getSrc(src)}
        fit={objectFit as GifFillMode}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    );
  },
};
