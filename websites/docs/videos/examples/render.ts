import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import { getCompositions } from "@remotion/renderer";
import { examples } from ".";
import { exec } from "child_process";

export const render = async () => {
  const entry = "./videos/register";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    webpackOverride: (config) => config,
  });
  const comps = await getCompositions(bundleLocation, {});
  for (const example of Object.keys(examples)) {
    const composition = comps.find((c) => c.id === example);
    const outputLocation = `public/examples/${example}.webm`;
    console.log("Attempting to render:", outputLocation);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "vp8",
      imageFormat: "png",
      pixelFormat: "yuva420p",
      everyNthFrame: 1,
      numberOfGifLoops: 0,
      outputLocation,
    });
    console.log("Done!");
    await new Promise((resolve, reject) => {
      exec(
        `ffmpeg -i  public/examples/${example}.webm -filter_complex "[0:v]split[x][y];[x]palettegen[z];[y][z]paletteuse" public/examples/${example}.gif`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          resolve(stdout ? stdout : stderr);
        }
      );
    });
  }
};
render();
