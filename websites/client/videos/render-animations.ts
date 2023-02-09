import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import { getCompositions } from "@remotion/renderer";
import { ComponentProps, TemplateType } from "@motionly/base";
import { allAnimations } from "./animations";
import { getRandomId, lowRep } from "../helpers";

export const animations = async () => {
  const entry = "./videos/register";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    webpackOverride: (config) => config,
  });
  const id = "id";
  const size = 100;
  const height = 50;
  const width = 50;
  const comp: ComponentProps = {
    id,
    width,
    height,
    x: size / 2 - width / 2,
    y: size / 2 - height / 2,
    comp: "div",
    bg: {
      type: "basic",
      color: "#000",
    },

    childIds: [],
  };
  const animations = allAnimations(comp);
  for (const section of animations) {
    for (let i = 0; i < section.animations.length; i++) {
      const element = section.animations[i];
      const outputLocation = lowRep(
        `public/animations/${section.name}_${element.name}`
      );
      console.log("Attempting to render:", outputLocation);

      const anims = Object.fromEntries(
        element.animations.map((a) => [getRandomId(), a])
      );
      const inputProps: TemplateType = {
        height: size,
        width: size,
        fps: 30,
        duration: 2,
        childIds: [id],
        bg: {
          type: "basic",
          color: "#ffffff",
        },
        components: {
          [id]: {
            ...comp,
            animations: { byIds: anims, allIds: Object.keys(anims) },
          },
        },
      };

      const comps = await getCompositions(bundleLocation, { inputProps });
      const composition = comps.find((c) => c.id === "Main");
      if (!composition) throw new Error("Composition not found");

      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        imageFormat: "jpeg",
        quality: 80,
        outputLocation: outputLocation + ".mp4",
        inputProps,
      });
    }
  }
  console.log("Done!");
};
animations();
