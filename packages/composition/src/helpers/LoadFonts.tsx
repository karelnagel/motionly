import { fonts } from "@motionly/base";
import { useEffect } from "react";
import { Template } from "../types";

const getFonts = (json: string) => {
  return json
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"))
    .filter((f) => f);
};

const loadFont = async (font: string) => {
  try {
    const fontToLoad = fonts.find((f) => f.value === font);
    if (!fontToLoad) return console.log(`Font ${font} not found`);
    const module = await fontToLoad.load();
    (module.loadFont as any)();
  } catch (e) {
    console.log(`Failed loading ${font}`);
  }
};

export const LoadFonts = ({ template }: { template: Template }) => {
  const fontFamilies = getFonts(JSON.stringify(template.components));
  useEffect(() => fontFamilies?.forEach(loadFont), [fontFamilies]);
  return null;
};
