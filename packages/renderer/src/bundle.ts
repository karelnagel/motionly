import { bundle as remotionBundle } from "@remotion/bundler";
import { bundleDir, entry } from ".";

export const bundle = async () => {
  await remotionBundle(entry, () => undefined, {
    webpackOverride: (config) => config,
    outDir: bundleDir,
  });
  console.log("Bundle done!")
};
bundle();
