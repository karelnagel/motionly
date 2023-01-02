import { MapProps } from "..";

export const defaultMapProps: MapProps = {
  id: "",
  type: "map",
  height: 500,
  width: 500,
  x: 0,
  y: 0,
  borderRadius: 10,
  rotation: 0,
  from: 0,
  duration: 0,
  location: {
    lat: 0,
    lng: 0,
  },
  zoom: 200,
  marker: {
    color: "#000000",
    size: 10,
  },
  fill: "#00000080",
  mapUrl: "",
  stroke: "#000000",
  strokeWidth: 1,
};
