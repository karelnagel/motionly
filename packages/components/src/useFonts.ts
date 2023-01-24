import axios from "axios";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

export const useFonts = async (fonts: string[]) => {
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    const load = async () => {
      if (fonts.length > 0) {
        const url = `https://fonts.googleapis.com/css?family=${fonts.join(
          "|"
        )}`;
        try {
          await axios.get(url);
        } catch (e) {
          console.log(e);
        }
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        link.type = "text/css";
        document.head.appendChild(link);
      }
      continueRender(handle);
    };
    load();
  }, [fonts]);
};
