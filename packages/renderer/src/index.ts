import { getCompositions, renderMedia } from "@remotion/renderer";
import path from "path";
import { Template } from "@motionly/composition";

export const compositionId = "Main";
export const entry = path.resolve("../composition/src/register.ts");
export const bundleDir = path.resolve("./bundle");

export const render = async (outputLocation: string, inputProps: Template) => {
  const comps = await getCompositions(bundleDir, {
    inputProps,
  });
  const composition = comps.find((c) => c.id === compositionId);
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
  }
  console.log("Attempting to render:", outputLocation);
  await renderMedia({
    composition,
    serveUrl: bundleDir,
    codec: "h264",
    outputLocation,
    inputProps,
  });
  console.log("Render done!");
};
