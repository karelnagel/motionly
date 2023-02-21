import { MapProps } from "@motionly/base";
import { IoIosMap } from "react-icons/io";
import { Component } from ".";

export const map: Component<MapProps> = {
  name: "Map",
  Icon: IoIosMap,
  hue: 270,
  inputs: [
    {
      prop: "src",
      label: "Source",
      type: "text",
    },
    {
      prop: "lat",
      label: "Latitude",
      type: "number",
    },
    {
      prop: "lng",
      label: "Longitude",
      type: "number",
    },
    {
      prop: "zoom",
      label: "Zoom",
      type: "number",
    },
    {
      prop: "stroke",
      label: "Stroke",
      type: "color",
    },
    {
      prop: "strokeWidth",
      label: "Stroke width (px)",
      type: "number",
      if: (comp) => !!comp.stroke,
    },
    {
      prop: "fill",
      label: "Fill",
      type: "color",
    },
    {
      prop: "bg",
      label: "Background",
      type: "color",
    },
    {
      prop: "markerColor",
      label: "Marker color",
      type: "color",
    },
    {
      prop: "markerSize",
      label: "Marker size (px)",
      type: "number",
      if: (comp) => !!comp.markerColor,
    },
  ],
};
