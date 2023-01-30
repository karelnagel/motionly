import { TemplateType } from "@motionly/base";
import { Input } from ".";

const inputs = {
  image: {
    type: "text",
    label: "Image",
    value: "https://picsum.photos/seed/sadfdasasd/1920/1080",
  },
  name: {
    type: "text",
    label: "Name",
    value: "Gary Vaynerchuck",
  },
  handle: {
    type: "text",
    label: "Handle",
    value: "@garyvee",
  },
  text: {
    type: "text",
    label: "Text",
    value: "Hey, I'm Gary Vaynerchuck and I'm a huge fan of Motionly.",
  },
};

const template = ({
  image,
  name,
  handle,
  text,
}: {
  image?: Input;
  name?: Input;
  handle?: Input;
  text?: Input;
}): TemplateType => ({
  duration: 10,
  fps: 30,
  height: 480,
  width: 854,
  comps: [
    {
      comp: "image",
      objectFit: "cover",
      src: image.value,
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
      bg: {
        type: "basic",
        color: "#FFFFFFFF",
      },
      comps: [
        {
          comp: "text",
          textStyle: {
            color: {
              type: "basic",
              color: "#000",
            },
            fontSize: 22,
            fontFamily: "Inter",
            fontWeight: 700,
            textAlign: "left",
          },
          text: name.value,
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
          src: "https://picsum.photos/seed/sadfsd/1920/1080",
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
            color: {
              type: "basic",
              color: "#000",
            },
            fontSize: 22,
            fontFamily: "Inter",
            fontWeight: 400,
            textAlign: "left",
          },
          text: handle.value,
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
            color: {
              type: "basic",
              color: "#000",
            },
            fontSize: 30,
            fontFamily: "Inter",
            fontWeight: 400,
            textAlign: "left",
            lineHeight: 1.3,
          },
          text: text.value,
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
});

export const tweet = {
  inputs,
  template,
};
