import { createClient } from "pexels";
import { Source } from ".";
import { env } from "../../../../../env.mjs";

const client = createClient(env.PEXELS_API_KEY || "");

export const Pexels: Source = {
  name: "Pexels",
  logo: "https://images.pexels.com/lib/api/pexels.png",
  url: "https://pexels.com",
  types: ["image", "video"],
  search: async (type, per_page, query) => {
    try {
      if (type === "image") {
        const res = query
          ? await client.photos.search({ query, per_page })
          : await client.photos.curated({ per_page });
        if ("photos" in res)
          return res.photos.map((p) => ({
            icon: p.src.small,
            src: p.src.original,
            type,
          }));
      }
      if (type === "video") {
        const res = query
          ? await client.videos.search({ query, per_page })
          : await client.videos.popular({ per_page });
        if ("videos" in res)
          return res.videos.map((p) => ({
            icon: p.image,
            src: p.video_files[0].link,
            type,
          }));
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  },
};
