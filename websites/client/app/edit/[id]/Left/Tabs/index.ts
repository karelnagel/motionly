import {
  IoIosAlbums,
  IoIosSettings,
  IoIosImages,
  IoIosCode,
  IoIosSunny,
} from "react-icons/io";
import { IoShapesSharp, IoText } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import { HiVariable } from "react-icons/hi";

export const LeftTabs = {
  template: {
    name: "Template",
    Icon: IoIosSettings,
    Component: () => import("./Template"),
  },
  inputs: {
    name: "Inputs",
    Icon: HiVariable,
    Component: () => import("./Inputs"),
  },
  media: {
    name: "Media",
    Icon: IoIosAlbums,
    Component: () => import("./Media"),
  },
  stock: {
    name: "Stock media",
    Icon: IoIosImages,
    Component: () => import("./Stock"),
  },
  elements: {
    name: "Elements",
    Icon: IoShapesSharp,
    Component: () => import("./Elements"),
  },
  text: {
    name: "Text",
    Icon: IoText,
    Component: () => import("./Text"),
  },
  data: {
    name: "Data",
    Icon: AiOutlineDatabase,
    Component: () => import("./Data"),
  },
  code: {
    name: "Code",
    Icon: IoIosCode,
    Component: () => import("./Code"),
  },
  ai: {
    name: "AI",
    Icon: IoIosSunny,
    Component: () => import("./AI"),
  },
};
export type LeftTabs = keyof typeof LeftTabs;