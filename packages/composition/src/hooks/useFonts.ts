import { ComponentProps, getFonts } from "@motionly/base";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender } from "remotion";

const loadFonts = async (fonts: string[]) => {
  if (fonts.length > 0) {
    try {
      const url = `https://fonts.googleapis.com/css?family=${fonts.join(
        ":100,200,300,400,500,600,700,800|"
      )}:100,200,300,400,500,600,700,800`;
      await axios.get(url);

      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    } catch (e) {
      console.log(e);
    }
  }
};

export const useFonts = async (comps?: ComponentProps[]) => {
  const [handle] = useState(() => delayRender("Loading fonts"));
  const fonts = useMemo(() => getFonts(comps), [comps]) || [];

  useEffect(() => {
    loadFonts(fonts)
      .then(() => {
        continueRender(handle);
      })
      .catch((e) => console.log(e));
  }, [fonts.toString()]);
};
