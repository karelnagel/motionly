import { createClient } from "pexels";
import { Source } from ".";
import { MediaTabs } from "../../types";

const client = createClient(process.env.PEXELS_API || "");

export const Pexels: Source = {
  name: "Pexels",
  logo: "https://images.pexels.com/lib/api/pexels.png",
  types: ["image", "video"],
  search: async (type: MediaTabs, query: string) => {
    try {
      if (type === "image") {
        const res = await client.photos.search({ query, per_page: 21 });
        if ("photos" in res)
          return res.photos.map((p) => ({
            icon: p.src.small,
            src: p.src.original,
          }));
      }
      if (type === "video") {
        const res = await client.videos.search({ query, per_page: 21 });
        if ("videos" in res)
          return res.videos.map((p) => ({
            icon: p.image,
            src: p.video_files[0].link,
          }));
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  },
  initial: async (type: MediaTabs) => {
    try {
      if (type === "image") {
        const res = await client.photos.curated({ per_page: 9 });
        if ("photos" in res)
          return res.photos.map((p) => ({
            icon: p.src.small,
            src: p.src.original,
          }));
      }
      if (type === "video") {
        const res = await client.videos.popular({ per_page: 9 });
        if ("videos" in res)
          return res.videos.map((p) => ({
            icon: p.image,
            src: p.video_files[0].link,
          }));
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  },
};
