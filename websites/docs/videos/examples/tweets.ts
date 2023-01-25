import { TemplateType } from "@asius/base";

export const tweets: TemplateType = {
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  comps: [
    {
      comp: "video",
      objectFit: "cover",
      startFrom: 0,
      src: "https://asius-media.s3.amazonaws.com/clcl1mck50000mf0816lo9n01/Ocean - 74888.mp4",
      muted: false,
      volume: 100,
      id: "ysf426y",
      x: 0,
      y: 0,
      borderRadius: 0,
      duration: 0,
      from: 0,
      rotation: 0,
      animations: [],
    },
    {
      comp: "div",
      bg: "#ffffffFF",
      comps: [
        {
          comp: "text",
          textStyle: {
            bg: "#00000000",
            color: "#000000FF",
            fontSize: 22,
            fontFamily: "Arial",
            fontWeight: 700,
            textAlign: "left",
          },
          text: "Gary Vaynerchuck",
          id: "qdpf4u",
          x: 92.89699499999999,
          y: 16.022819300000013,
          width: 504,
          height: 39,
          borderRadius: 0,
          duration: 0,
          from: 0,
          rotation: 0,
          animations: [],
        },
        {
          comp: "image",
          objectFit: "cover",
          src: "https://asius-media.s3.amazonaws.com/clcl1mck50000mf0816lo9n01/qRxbC9Xq_400x400.jpg",
          id: "tk68tmq",
          x: 22.140776099999993,
          y: 16.35842010000001,
          width: 62,
          height: 62,
          borderRadius: 1000,
          duration: 0,
          from: 0,
          rotation: 0,
          animations: [],
        },
        {
          comp: "text",
          textStyle: {
            bg: "#00000000",
            color: "#000000FF",
            fontSize: 22,
            fontFamily: "Arial",
            fontWeight: 400,
            textAlign: "left",
          },
          text: "@Garyvee",
          id: "jt5w4y",
          x: 91.75425690000006,
          y: 40.39382100000003,
          width: 504,
          height: 37,
          borderRadius: 0,
          duration: 0,
          from: 0,
          rotation: 0,
          animations: [],
        },
        {
          comp: "text",
          textStyle: {
            bg: "#00000000",
            color: "#000000FF",
            fontSize: 30,
            fontFamily: "Arial",
            fontWeight: 400,
            textAlign: "left",
            lineHeight: 1.3,
          },
          text: "Shitting on someone else isn't gonna make you happier...",
          id: "dlb8034",
          x: 22.186189300000045,
          y: 83.36745889999995,
          width: 656,
          height: 182,
          borderRadius: 0,
          duration: 0,
          from: 0,
          rotation: 0,
          animations: [],
        },
      ],
      id: "bv73ts",
      x: 88.28832039999995,
      y: 153.27097889999982,
      width: 699,
      height: 184,
      borderRadius: 20,
      duration: 0,
      from: 0,
      rotation: 0,
      animations: [
        {
          prop: "opacity",
          type: "spring",
          start: -2,
          from: 1,
          to: 0,
          duration: 0,
          mass: 1,
          damping: 14,
          stiffness: 80,
        },
      ],
    },
  ],
};