import { Iphone } from "./IPhone";
import { IPad } from "./ipad";
import { Iphone14 } from "./iphone14";
import { Macbook } from "./macbook";
import { Macbook2 } from "./macbook2";
import { Monitor } from "./monitor";
import { Samsung } from "./samsung";
import { Watch } from "./watch";
import { CSSProperties } from "react";
import { z } from "zod";
import { Color, MockupTypes } from "@motionly/inputs";
import { Component } from "../..";

export const MockupProps = z.object({
  bg: Color.optional(),
  type: MockupTypes,
});
export type MockupProps = z.infer<typeof MockupProps>;

export const svgStyle: CSSProperties = {
  position: "relative",
  height: "100%",
};

const mockups: {
  [key: string]: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    borderRadius?: number;
  };
} = {
  samsung: { borderRadius: 1 },
  macbook: {
    top: 6,
    bottom: 9,
    left: 10,
    right: 10,
  },
  macbook2: {
    top: 3,
    borderRadius: 1,
    bottom: 9,
    left: 10,
    right: 10,
  },
  ipad: {
    bottom: 4,
    right: 5,
  },
  watch: {
    top: 22,
    bottom: 20,
    left: 8,
    right: 12,
  },
  monitor: {
    right: 2,
    left: 2,
    borderRadius: 1,
    bottom: 24,
  },
};
export const mockup: Component<MockupProps> = {
  zod: MockupProps,
  inputs: {
    bg: { color: { label: "Background" } },
    type: { select: { label: "Type", options: "mockup-types" } },
  },
  examples: [
    {
      title: "Iphone 12",
      props: { props: { type: "iphone" } },
    },
    {
      title: "Macbook",
      props: { props: { type: "macbook" } },
    },
    {
      title: "Iphone 14",
      props: { props: { type: "iphone14" } },
    },
    {
      title: "Ipad",
      props: { props: { type: "ipad" } },
    },
    {
      title: "Macbook 2",
      props: { props: { type: "macbook2" } },
    },
    {
      title: "Monitor",
      props: { props: { type: "monitor" } },
    },
    {
      title: "Samsung",
      props: { props: { type: "samsung" } },
    },
    {
      title: "Watch",
      props: { props: { type: "watch" } },
    },
  ],
  component: ({ type, bg }) => {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: `${mockups[type]?.top || 2.1}%`,
            bottom: `${mockups[type]?.bottom || 1.8}%`,
            left: `${mockups[type]?.left || 5.2}%`,
            right: `${mockups[type]?.right || 4}%`,
            borderRadius: `${mockups[type]?.borderRadius || 7}%`,
            overflow: "hidden",
            background: bg,
          }}
        ></div>
        {type === "iphone" && <Iphone />}
        {type === "ipad" && <IPad />}
        {type === "iphone14" && <Iphone14 />}
        {type === "macbook" && <Macbook />}
        {type === "macbook2" && <Macbook2 />}
        {type === "monitor" && <Monitor />}
        {type === "samsung" && <Samsung />}
        {type === "watch" && <Watch />}
      </div>
    );
  },
};
