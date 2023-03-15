import { IoIosAlbums, IoIosSettings, IoIosCode } from "react-icons/io";
import { IoShapesSharp } from "react-icons/io5";
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
  code: {
    name: "Code",
    Icon: IoIosCode,
    Component: () => import("./Code"),
  },
  export: {
    name: "Export",
    Icon: CiExport,
    Component: () => import("./Export"),
  },
};
export type LeftTabs = keyof typeof LeftTabs;
