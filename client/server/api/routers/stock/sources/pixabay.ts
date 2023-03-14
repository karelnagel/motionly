import axios from "axios";
import { Source } from ".";
import { env } from "../../../../../env.mjs";

const getImage = (e: any) =>
  `https://i.vimeocdn.com/video/${e.picture_id}_200x150.jpg`;

const key = env.PIXABY_API_KEY;
export const Pixabay: Source = {
  name: "Pixabay",
  logo: "https://pixabay.com/static/img/logo_square.png",
  url: "https://pixabay.com",
  types: ["IMAGE", "VIDEO"],
  search: async (type, per_page, q?) => {
    try {
      if (type === "VIDEO") {
        const res = await axios.get(`https://pixabay.com/api/videos/`, {
          params: { key, q, per_page },
        });
        if (res.data.hits)
          return res.data.hits.map((p: any) => ({
            icon: getImage(p),
            src: p.videos.tiny.url,
            type,
          }));
      }
      if (type === "IMAGE") {
        const res = await axios.get(`https://pixabay.com/api/`, {
          params: { key, q, per_page },
        });
        if (res.data.hits)
          return res.data.hits.map((p: any) => ({
            icon: p.previewURL,
            src: p.largeImageURL,
            type,
          }));
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  },
};
