import axios from "axios";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

const loadFonts = async (fonts: string[]) => {
  if (fonts.length > 0) {
    try {
      const url = `https://fonts.googleapis.com/css?family=${fonts.join("|")}`;
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

export const useFonts = async (fonts: string[] = []) => {
  const [handle] = useState(() => delayRender("Loading fonts"));
  const [loadedFonts, setLoadedFonts] = useState([] as string[]);

  useEffect(() => {
    const fontsToLoad = fonts.filter((f) => !loadedFonts.includes(f));
    loadFonts(fonts)
      .then(() => {
        setLoadedFonts((f) => [...f, ...fontsToLoad]);
        continueRender(handle);
      })
      .catch((e) => console.log(e));
  }, [fonts]);
};
