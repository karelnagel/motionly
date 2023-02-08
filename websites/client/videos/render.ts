import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill } from "@remotion/renderer";
import path from "path";
import { getCompositions } from "@remotion/renderer";
import { TemplateType } from "@motionly/base";
import { getWidthAndHeight, sections } from "./elements";

export const render = async () => {
  const entry = "./videos/register";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    webpackOverride: (config) => config,
  });

  for (const section of sections) {
    for (let i = 0; i < section.elements.length; i++) {
      const element = section.elements[i];
      const outputLocation = `public/elements/${section.title}_${i}`;
      console.log("Attempting to render:", outputLocation);
      const id = "id";
      const size = 300;
      const { width, height } = getWidthAndHeight(270, element.aspectRatio);
      const inputProps: TemplateType = {
        height: size,
        width: size,
        fps: 30,
        duration: 5,
        childIds: [id],
        bg: {
          type: "basic",
          color: "#ffffff",
        },
        components: {
          [id]: {
            ...element.props,
            id,
            width,
            height,
            x: size / 2 - width / 2,
            y: size / 2 - height / 2,
          },
        },
      };

      const comps = await getCompositions(bundleLocation, { inputProps });
      const composition = comps.find((c) => c.id === "Main");
      if (!composition) throw new Error("Composition not found");
      await renderStill({
        composition,
        serveUrl: bundleLocation,
        imageFormat: "jpeg",
        quality: 100,
        output: outputLocation + ".jpg",
        frame: inputProps.duration * inputProps.fps - 1,
        inputProps,
      });
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        imageFormat: "jpeg",
        quality: 80,
        outputLocation: outputLocation + ".mp4",
        inputProps,
      });
      console.log("Done!");
    }
    console.log("Done!");
  }
};
render();
