import { createClient } from "pexels";
import { Source } from ".";
import { MediaTabs } from "../../types";

const client = createClient(process.env.PEXELS_API || "");

export const Pexels: Source = {
  name: "Pexels",
  logo: "https://images.pexels.com/lib/api/pexels.png",
  url: "https://pexels.com",
  types: ["image", "video"],
  search: async (type: MediaTabs, per_page: number, query?: string) => {
    try {
      if (type === "image") {
        const res = query
          ? await client.photos.search({ query, per_page })
          : await client.photos.curated({ per_page });
        if ("photos" in res)
          return res.photos.map((p) => ({
            icon: p.src.small,
            src: p.src.original,
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
          }));
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  },
};
