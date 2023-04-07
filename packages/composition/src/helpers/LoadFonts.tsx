import { fonts } from "@motionly/base";
import { useEffect } from "react";
import { Template } from "../types";

const getFonts = (json: string) => {
  return json
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"))
    .filter((f) => f);
};

export const LoadFonts = ({ template }: { template: Template }) => {
  const fontFamilies = getFonts(JSON.stringify(template.components));
  useEffect(() => {
    if (!fontFamilies) return;
    for (const font of fontFamilies) {
      fonts
        .find((f) => f.value === font)
        ?.load()
        .then((f) => (f.loadFont as any)());
    }
  }, [fontFamilies]);
  return null;
};
