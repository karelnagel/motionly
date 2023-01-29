import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import { getCompositions } from "@remotion/renderer";
import { examples } from ".";

export const render = async () => {
  const entry = "./videos/register";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    webpackOverride: (config) => config,
  });
  const comps = await getCompositions(bundleLocation, {});
  for (const example of Object.keys(examples)) {
    const composition = comps.find((c) => c.id === example);
    const outputLocation = `public/examples/${example}.mp4`;
    console.log("Attempting to render:", outputLocation);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      imageFormat: "jpeg",
      quality:100,
      outputLocation,
    });
    console.log("Done!");
  }
};
render();
