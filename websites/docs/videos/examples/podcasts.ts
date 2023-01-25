import { TemplateType } from "@asius/base";

export const podcasts: TemplateType = {
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  comps: [
    {
      comp: "image",
      id: "image",
      src: "https://picsum.photos/seed/sd/600/600",
      height: 300,
      objectFit: "cover",
    },
  ],
};
