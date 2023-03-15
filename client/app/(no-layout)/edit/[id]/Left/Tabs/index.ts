import { IoIosAlbums, IoIosSettings, IoIosImages, IoIosCode, IoIosSunny } from "react-icons/io";
import { IoShapesSharp, IoText } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import { HiVariable } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
export const LeftTabs = {
  template: {
    name: "Template",
    Icon: IoIosSettings,
    Component: () => import("./Template"),
  },
  elements: {
    name: "Elements",
    Icon: IoShapesSharp,
    Component: () => import("./Elements"),
  },
  media: {
    name: "Media",
    Icon: IoIosAlbums,
    Component: () => import("./Media"),
  },
  inputs: {
    name: "Variables",
    Icon: HiVariable,
    Component: () => import("./Variables"),
  },
  // text: {
  //   name: "Text",
  //   Icon: IoText,
  //   Component: () => import("./Text"),
  // },
  // data: {
  //   name: "Data",
  //   Icon: AiOutlineDatabase,
  //   Component: () => import("./Data"),
  // },
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
  export: {
    name: "Export",
    Icon: CiExport,
    Component: () => import("./Export"),
  },
};
export type LeftTabs = keyof typeof LeftTabs;
