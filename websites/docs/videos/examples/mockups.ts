import { TemplateType } from "@asius/base";

export const mockups: TemplateType = {
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  comps: [
    {
      comp: "mockup",
      id: "mockupas",
      type: "iPhone",
      comps: [
        {
          comp: "image",
          id: "image",
          src: "https://picsum.photos/seed/sd/600/600",
        },
      ],
    },
  ],
};
