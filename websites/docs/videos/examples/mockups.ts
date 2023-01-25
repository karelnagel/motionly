import { ComponentProps, TemplateType } from "@asius/base";

const mockup = (i: number): ComponentProps => ({
  comp: "mockup",
  id: "mockup",
  type: "iPhone",
  x: 600 - i * 275,
  y: 50,
  width: 300,
  from: i * 0.3,
  height: 380,
  transform: [
    {
      prop: "perspective",
      value: 1000,
    },
    {
      prop: "scale",
      value: i === 1 ? 0.95 : 1,
    },
  ],
  animations: [
    {
      prop: i === 1 ? "translateY" : "translateX",
      type: "spring",
      from: i == 2 ? -400 : 400,
      to: 0,
    },
    {
      prop: "rotateY",
      type: "spring",
      from: 0,
      start: 0.3,
      to: -20 + i * 20,
    },
    {
      prop: "rotateX",
      type: "noise",
      from: -10 + i,
      to: 10 + i,
      speed: 2,
    },
    {
      prop: "rotateY",
      type: "noise",
      from: -10 + i,
      to: 10 + i,
      speed: 2,
    },
  ],
  comps: [
    {
      comp: "image",
      id: "image",
      src: `https://picsum.photos/seed/${i + 203}/600/600`,
    },
  ],
});

export const mockups: TemplateType = {
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  comps: [mockup(0), mockup(1), mockup(2)],
};
