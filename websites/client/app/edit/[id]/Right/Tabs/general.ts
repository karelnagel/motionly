import { IoIosSettings } from "react-icons/io";
import { Tab } from ".";

export const general: Tab = {
  name: "General",
  Icon: IoIosSettings,
  inputs: [
    {
      type: "number",
      prop: "x",
      label: "X (px)",
    },
    {
      type: "number",
      prop: "y",
      label: "Y (px)",
    },
    {
      type: "number",
      prop: "width",
      label: "Width (px)",
    },
    {
      type: "number",
      prop: "height",
      label: "Height (px)",
    },
    {
      type: "number",
      prop: "rotation",
      label: "Rotation (deg)",
    },
    {
      type: "number",
      prop: "borderRadius",
      label: "Border radius (px)",
    },
    {
      type: "number",
      prop: "from",
      label: "From (s)",
    },
    {
      type: "number",
      prop: "duration",
      label: "Duration (s)",
    },
    {
      type: "number",
      prop: "opacity",
      label: "Opacity",
    },
    {
      type: "number",
      prop: "loopDuration",
      label: "Loop duration (s)",
    },
  ],
};
