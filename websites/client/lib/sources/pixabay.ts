import axios from "axios";
import { Source } from ".";
import { MediaTabs } from "../../types";

const getImage = (e: any) =>
  `https://i.vimeocdn.com/video/${e.picture_id}_200x150.jpg`;

const key = process.env.PIXABAY_API;
export const Pixabay: Source = {
  name: "Pixabay",
  logo: "https://pixabay.com/static/img/logo_square.png",
  url: "https://pixabay.com",
  types: ["image", "video"],
  search: async (type: MediaTabs, per_page: number, q?: string) => {
    try {
      if (type === "video") {
        const res = await axios.get(`https://pixabay.com/api/videos/`, {
          params: { key, q, per_page },
        });
        if (res.data.hits)
          return res.data.hits.map((p: any) => ({
            icon: getImage(p),
            src: p.videos.tiny.url,
          }));
      }
      if (type === "image") {
        const res = await axios.get(`https://pixabay.com/api/`, {
          params: { key, q, per_page },
        });
        if (res.data.hits)
          return res.data.hits.map((p: any) => ({
            icon: p.previewURL,
            src: p.largeImageURL,
          }));
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  },
};
