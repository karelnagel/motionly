import { AllComponents, videoUrl } from "@motionly/base";
import {
  defaultPathProps,
  defaultTranscriptionProps,
} from "@motionly/components";
import Image, { StaticImageData } from "next/image";
import { getRandomId } from "../../../../../helpers";
import { useProject } from "../../../../../hooks/useProject";
import square from "../../../../../public/elements/square.png";

type Element = {
  title: string;
  props: AllComponents;
  image: StaticImageData;
};
type Section = {
  title: string;
  elements: Element[];
};

export const sections: Section[] = [
  {
    title: "Shapes",
    elements: [
      {
        title: "Rectangle",
        image: square,
        props: {
          comp: "shape",
          type: "rect",
          cornerRadius: 0,
          height: 100,
          width: 100,
          strokeWidth: 0,
        },
      },
      {
        title: "Triangle",
        image: square,
        props: {
          comp: "shape",
          type: "triangle",
          direction: "up",
          cornerRadius: 0,
          height: 100,
          width: 100,
          strokeWidth: 0,
        },
      },
      {
        title: "Circle",
        image: square,
        props: {
          comp: "shape",
          type: "circle",
          height: 100,
          width: 100,
          strokeWidth: 0,
        },
      },
      {
        title: "Ellipse",
        image: square,
        props: {
          comp: "shape",
          type: "ellipse",
          height: 100,
          width: 100,
          strokeWidth: 0,
        },
      },
    ],
  },
  {
    title: "Text",
    elements: [
      {
        title: "Text",
        image: square,
        props: {
          comp: "text",
          text: "Text",
          justifyContent: "center",
          textStyle: {
            color: {
              type: "basic",
              color: "#000",
            },
            fontFamily: "Inter",
            fontSize: 140,
            fontWeight: 800,
            lineHeight: 1,
            textAlign: "center",
          },
        },
      },
    ],
  },
  {
    title: "Audiogram",
    elements: [
      {
        title: "Center mirrored",
        image: square,
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
            color: "#00F",
          },
        },
      },
      {
        title: "Top",
        image: square,
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
            color: "#00F",
          },
        },
      },
      {
        title: "Bottom",
        image: square,
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
            color: "#00F",
          },
        },
      },
    ],
  },
  {
    title: "Graph",
    elements: [
      {
        title: "Line",
        image: square,
        props: {
          comp: "graph",
          type: "line",
          height: 100,
          width: 100,
          strokeWidth: 14,
          color: {
            type: "basic",
            color: "#00F",
          },
          src: [1, 2, 3, 8, 5, 3],
        },
      },
      {
        title: "Bar",
        image: square,
        props: {
          comp: "graph",
          type: "bar",
          height: 100,
          width: 100,
          roundness: 10,
          gap: 3,
          color: {
            type: "basic",
            color: "#00F",
          },
          src: [8, 4, 3, 4, 2, 10, 12, 2],
        },
      },
    ],
  },
  {
    title: "Lottie",
    elements: [
      {
        title: "Cubes",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_lS88YC8r3Y.json",
        },
      },
      {
        title: "Audio",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_p5Z4oJgZqR.json",
        },
      },
      {
        title: "Play",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_41zJLwFKz5.json",
        },
      },
      {
        title: "Delivery man",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets4.lottiefiles.com/packages/lf20_DTosIIqiu8.json",
        },
      },
      {
        title: "Circles",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets9.lottiefiles.com/packages/lf20_7l71ZaiDM3.json",
        },
      },
      {
        title: "Checkmark",
        image: square,
        props: {
          loop: true,
          comp: "lottie",
          src: "https://assets9.lottiefiles.com/packages/lf20_WdSu0kAi8S.json",
        },
      },
    ],
  },
  {
    title: "Map",
    elements: [
      {
        title: "Eiffel tower",
        image: square,
        props: {
          comp: "map",
          lat: 48.8584,
          lng: 2.2945,
          zoom: 400,
          markerColor: {
            type: "basic",
            color: "#F00",
          },
          markerSize: 20,
        },
      },
      {
        title: "Statue of Liberty",
        image: square,
        props: {
          comp: "map",
          lat: 40.6892,
          lng: -74.0445,
          zoom: 200,
          fill: {
            type: "basic",
            color: "#fff",
          },
          stroke: {
            type: "basic",
            color: "#000",
          },
          markerColor: {
            type: "basic",
            color: "#F00",
          },
          markerSize: 300,
        },
      },
    ],
  },
  {
    title: "Mockup",
    elements: [
      {
        title: "IPhone",
        image: square,
        props: {
          comp: "mockup",
          type: "iphone",
          childIds: [],
        },
      },
      {
        title: "Macbook",
        image: square,
        props: {
          comp: "mockup",
          type: "macbook",
          childIds: [],
        },
      },
      {
        title: "Samsung",
        image: square,
        props: {
          comp: "mockup",
          type: "samsung",
          childIds: [],
        },
      },
      {
        title: "Monitor",
        image: square,
        props: {
          comp: "mockup",
          type: "monitor",
          childIds: [],
        },
      },
      {
        title: "IPhone 14",
        image: square,
        props: {
          comp: "mockup",
          type: "iphone14",
          childIds: [],
        },
      },
      {
        title: "Apple Watch",
        image: square,
        props: {
          comp: "mockup",
          type: "watch",
          childIds: [],
        },
      },
      {
        title: "Macbook 2",
        image: square,
        props: {
          comp: "mockup",
          type: "macbook2",
          childIds: [],
        },
      },
      {
        title: "IPad",
        image: square,
        props: {
          comp: "mockup",
          type: "ipad",
          childIds: [],
        },
      },
    ],
  },
  {
    title: "Path",
    elements: [
      {
        title: "Apple logo (example)",
        image: square,
        props: {
          ...defaultPathProps,
        },
      },
    ],
  },
  {
    title: "Progress bar",
    elements: [
      {
        title: "Line",
        image: square,
        props: {
          comp: "progressbar",
          type: "line",
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#00F",
          },
        },
      },
      {
        title: "Spotify",
        image: square,
        props: {
          comp: "progressbar",
          type: "spotify",
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#00F",
          },
        },
      },
      {
        title: "Square",
        image: square,
        props: {
          comp: "progressbar",
          type: "square",
          barWidth: 20,
          height: 100,
          width: 100,
          color: {
            type: "basic",
            color: "#00F",
          },
        },
      },
      {
        title: "Circle",
        image: square,
        props: {
          comp: "progressbar",
          type: "circle",
          height: 100,
          width: 100,
          barWidth: 20,
          color: {
            type: "basic",
            color: "#00F",
          },
        },
      },
    ],
  },
  {
    title: "QR Code",
    elements: [
      {
        title: "Line",
        image: square,
        props: {
          comp: "qrcode",
          text: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      },
    ],
  },
  {
    title: "Confetti",
    elements: [
      {
        title: "Confetti",
        image: square,
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
    title: "Div",
    elements: [
      {
        title: "Div",
        image: square,
        props: {
          comp: "div",
          childIds: [],
        },
      },
    ],
  },
  {
    title: "Transcription",
    elements: [
      {
        title: "Transcription",
        image: square,
        props: {
          ...defaultTranscriptionProps,
        },
      },
    ],
  },
];

export default function Elements() {
  return (
    <div className="overflow-auto">
      {sections.map((s, i) => {
        return <Section key={i} {...s} />;
      })}
    </div>
  );
}

const Section = (s: Section) => {
  return (
    <div>
      <p className="font-semibold">{s.title}</p>
      <div className="grid grid-cols-3">
        {s.elements.map((e, i) => {
          return <Element key={i} {...e} />;
        })}
      </div>
    </div>
  );
};

const Element = (e: Element) => {
  const width = useProject((s) => s.project.template.width);
  const height = useProject((s) => s.project.template.height);
  const addComp = useProject((s) => s.addComp);
  const size = Math.max(width, height) * 0.2;
  return (
    <button
      onClick={() =>
        addComp({
          ...e.props,
          id: getRandomId(),
          width: size,
          height: size,
          x: width * 0.5 - size / 2,
          y: height * 0.5 - size / 2,
        })
      }
      className="flex flex-col items-center cursor-pointer"
    >
      <Image src={e.image} alt={e.title} className="aspect-square  w-full" />
      {e.title}
    </button>
  );
};
