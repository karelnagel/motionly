import { AllComponents, videoUrl } from "@motionly/base";
import {
  defaultPathProps,
  defaultTranscriptionProps,
} from "@motionly/components";
import { components } from "../app/edit/[id]/Right/Tabs/components";

export type Element = {
  title: string;
  props: AllComponents;
  aspectRatio?: number;
};
export type Section = {
  title: keyof typeof components;
  elements: Element[];
};
export const getWidthAndHeight = (max: number, aspectRatio?: number) => {
  if (aspectRatio) {
    if (aspectRatio > 1)
      return {
        width: max,
        height: max / aspectRatio,
      };
    return {
      width: max * aspectRatio,
      height: max,
    };
  }
  return {
    width: max,
    height: max,
  };
};

export const sections: Section[] = [
  {
    title: "shape",
    elements: [
      {
        title: "Rectangle",
        props: {
          comp: "shape",
          type: "rect",
          height: 100,
          width: 100,
          strokeWidth: 0,
          fill: {
            type: "basic",
            color: "#a623e8",
          },
        },
      },
      {
        title: "Round rectangle",
        props: {
          comp: "shape",
          type: "rect",
          edgeRoundness: 0.9,
          height: 100,
          width: 100,
          strokeWidth: 0,
          fill: {
            type: "basic",
            color: "#f0771a",
          },
        },
      },
      {
        title: "Triangle",
        props: {
          comp: "shape",
          type: "triangle",
          direction: "up",
          cornerRadius: 0,
          height: 100,
          width: 100,
          strokeWidth: 0,
          fill: {
            type: "basic",
            color: "#1af0d0",
          },
        },
      },
      {
        title: "Circle",
        props: {
          comp: "shape",
          type: "circle",
          height: 100,
          width: 100,
          strokeWidth: 0,
          fill: {
            type: "basic",
            color: "#690ef0",
          },
        },
      },
      {
        title: "Ellipse",
        aspectRatio: 1.3,
        props: {
          comp: "shape",
          type: "ellipse",
          height: 100,
          width: 100,
          strokeWidth: 0,
          fill: {
            type: "basic",
            color: "#0e52f0",
          },
        },
      },
    ],
  },
  {
    title: "text",
    elements: [
      {
        title: "Usual",
        aspectRatio: 2,
        props: {
          comp: "text",
          text: "Text",
          justifyContent: "center",
          textStyle: {
            color: {
              type: "basic",
              color: "#000000",
            },
            fontFamily: "Inter",
            fontSize: 100,
            fontWeight: "400",
            lineHeight: 1.2,
            textAlign: "center",
          },
        },
      },
      {
        title: "Bold",
        aspectRatio: 2,
        props: {
          comp: "text",
          text: "Text",
          justifyContent: "center",
          textStyle: {
            color: {
              type: "basic",
              color: "#000000",
            },
            fontFamily: "Inter",
            fontSize: 100,
            fontWeight: "900",
            lineHeight: 1.2,
            textAlign: "center",
          },
        },
      },
      {
        title: "Outline",
        aspectRatio: 2,
        props: {
          comp: "text",
          text: "Text",
          justifyContent: "center",
          textStyle: {
            color: {
              type: "basic",
              color: "#ffffff",
            },
            outlineColor: {
              type: "basic",
              color: "#ff000",
            },
            outlineWidth: 10,
            fontFamily: "Inter",
            fontSize: 100,
            fontWeight: "900",
            lineHeight: 1.2,
            textAlign: "center",
          },
        },
      },
    ],
  },
  {
    title: "audiogram",
    elements: [
      {
        title: "Center mirrored",
        props: {
          comp: "audiogram",
          src: videoUrl,
          barWidth: 20,
          height: 100,
          width: 100,
          gap: 4,
          mirror: true,
          multiplier: 2,
          position: "center",
          roundness: 20,
          smoothing: true,
          color: {
            type: "basic",
            color: "#0e52f0",
          },
        },
      },
      {
        title: "Top",
        props: {
          comp: "audiogram",
          src: videoUrl,
          barWidth: 30,
          height: 100,
          width: 100,
          gap: 4,
          mirror: false,
          multiplier: 2,
          position: "start",
          roundness: 20,
          smoothing: true,
          color: {
            type: "basic",
            color: "#f00e87",
          },
        },
      },
      {
        title: "Bottom",
        props: {
          comp: "audiogram",
          src: videoUrl,
          barWidth: 20,
          height: 100,
          width: 100,
          gap: 4,
          mirror: true,
          multiplier: 2,
          position: "end",
          roundness: 10,
          smoothing: true,
          color: {
            type: "basic",
            color: "#e1f00e",
          },
        },
      },
    ],
  },
  {
    title: "graph",
    elements: [
      {
        title: "Line",
        props: {
          comp: "graph",
          type: "line",
          height: 100,
          width: 100,
          strokeWidth: 14,
          animationDuration: 5,
          animationStart: 0,
          color: {
            type: "basic",
            color: "#0e52f0",
          },
          src: [
            1, 2, 3, 8, 5, 3, 2, 1, 5, 4, 3, 5, 7, 6, 3, 2, 5, 7, 6, 4, 7, 3, 7,
          ],
        },
      },
      {
        title: "Bar",
        props: {
          comp: "graph",
          type: "bar",
          height: 100,
          width: 100,
          roundness: 10,
          gap: 3,
          animationDuration: 2,
          animationStart: 0,
          color: {
            type: "basic",
            color: "#1fff9a",
          },
          src: [8, 4, 3, 4, 2, 10, 12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
      },
    ],
  },
  {
    title: "lottie",
    elements: [
      {
        title: "Subscribe",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets6.lottiefiles.com/packages/lf20_G0GPMHvYIG.json",
        },
      },
      {
        title: "Audio",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_p5Z4oJgZqR.json",
        },
      },
      {
        title: "Play",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_41zJLwFKz5.json",
        },
      },
      {
        title: "Delivery man",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_DTosIIqiu8.json",
        },
      },
      {
        title: "Google",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets5.lottiefiles.com/datafiles/nT4vnUFY9yay7QI/data.json",
        },
      },
      {
        title: "Checkmark",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets5.lottiefiles.com/datafiles/uoZvuyyqr04CpMr/data.json",
        },
      },
      {
        title: "Youtube",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets3.lottiefiles.com/private_files/lf30_cwyafad8.json",
        },
      },
      {
        title: "Tiktok",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets2.lottiefiles.com/private_files/lf30_keymopaz.json",
        },
      },
      {
        title: "Paperplane",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets5.lottiefiles.com/packages/lf20_x62chJ.json",
        },
      },
      {
        title: "Star",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets10.lottiefiles.com/datafiles/0BklE7L1HhdHa4v/data.json",
        },
      },
      {
        title: "Confetti",
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets6.lottiefiles.com/datafiles/U1I3rWEyksM9cCH/data.json",
        },
      },
    ],
  },
  {
    title: "map",
    elements: [
      {
        title: "Eiffel tower",
        props: {
          comp: "map",
          lat: 48.8584,
          lng: 2.2945,
          zoom: 400,
          markerColor: {
            type: "basic",
            color: "#Ff0000",
          },
          markerSize: 40,
        },
      },
      {
        title: "Statue of Liberty",
        props: {
          comp: "map",
          lat: 40.6892,
          lng: -74.0445,
          zoom: 200,
          fill: {
            type: "basic",
            color: "#ffffff",
          },
          stroke: {
            type: "basic",
            color: "#000000",
          },
          markerColor: {
            type: "basic",
            color: "#Ff0000",
          },
          markerSize: 40,
        },
      },
    ],
  },
  {
    title: "mockup",
    elements: [
      {
        title: "IPhone",
        aspectRatio: 0.5,
        props: {
          comp: "mockup",
          type: "iphone",
          childIds: [],
        },
      },
      {
        title: "Macbook",
        aspectRatio: 1.7,
        props: {
          comp: "mockup",
          type: "macbook",
          childIds: [],
        },
      },
      {
        title: "Samsung",
        aspectRatio: 0.47,
        props: {
          comp: "mockup",
          type: "samsung",
          childIds: [],
        },
      },
      {
        title: "Monitor",
        aspectRatio: 1.3,
        props: {
          comp: "mockup",
          type: "monitor",
          childIds: [],
        },
      },
      {
        title: "IPhone 14",
        aspectRatio: 0.49,
        props: {
          comp: "mockup",
          type: "iphone14",
          childIds: [],
        },
      },
      {
        title: "Apple Watch",
        aspectRatio: 0.58,
        props: {
          comp: "mockup",
          type: "watch",
          childIds: [],
        },
      },
      {
        title: "Macbook 2",
        aspectRatio: 1.6,
        props: {
          comp: "mockup",
          type: "macbook2",
          childIds: [],
        },
      },
      {
        title: "IPad",
        aspectRatio: 0.78,
        props: {
          comp: "mockup",
          type: "ipad",
          childIds: [],
        },
      },
    ],
  },
  {
    title: "path",
    elements: [
      {
        title: "Apple logo (example)",
        props: {
          ...defaultPathProps,
        },
      },
    ],
  },
  {
    title: "progressbar",
    elements: [
      {
        title: "Line",
        aspectRatio: 5,
        props: {
          comp: "progressbar",
          type: "line",
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#a623e8",
          },
        },
      },
      {
        title: "Spotify",
        aspectRatio: 8,
        props: {
          comp: "progressbar",
          type: "spotify",
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#000000",
          },
          bg: {
            type: "basic",
            color: "#00000080",
          },
        },
      },
      {
        title: "Square",
        props: {
          comp: "progressbar",
          type: "square",
          barWidth: 20,
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#00ff00",
          },
        },
      },
      {
        title: "Circle",
        props: {
          comp: "progressbar",
          type: "circle",
          height: 100,
          width: 100,
          barWidth: 20,
          color: {
            type: "basic",
            color: "#0000ff",
          },
        },
      },
    ],
  },
  {
    title: "qrcode",
    elements: [
      {
        title: "Line",
        props: {
          comp: "qrcode",
          text: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      },
    ],
  },
  {
    title: "confetti",
    elements: [
      {
        title: "Confetti",
        props: {
          comp: "confetti",
          posX: 0,
          posY: 0,
          angle: -45,
        },
      },
    ],
  },
  {
    title: "div",
    elements: [
      {
        title: "Div",
        props: {
          comp: "div",
          childIds: [],
        },
      },
    ],
  },
  {
    title: "transcription",
    elements: [
      {
        title: "Transcription",
        props: {
          ...defaultTranscriptionProps,
        },
      },
    ],
  },
];
