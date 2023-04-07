import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { continueRender, delayRender } from "remotion";
import { getSrc } from "../helpers/getSrc";
import { z } from "zod";
import { Component } from ".";
import { Color } from "@motionly/inputs";
import { IoIosMap } from "react-icons/io";

export const MapProps = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number().min(0),
  fill: Color.optional(),
  stroke: Color.optional(),
  strokeWidth: z.number().min(0).optional(),
  markerColor: Color.optional(),
  markerSize: z.number().min(0).optional(),
  src: z.string().url().optional(),
  bg: Color.optional(),
});
export type MapProps = z.infer<typeof MapProps>;
const def = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
export const map: Component<MapProps> = {
  zod: MapProps,
  Icon: IoIosMap,
  hue: 270,
  inputs: {
    src: { text: { label: "Source" } },
    lat: { number: { label: "Latitude" } },
    lng: { number: { label: "Longitude" } },
    zoom: { range: { label: "Zoom", min: 0.1, max: 100, step: 0.1 } },
    fill: { color: { label: "Fill" } },
    stroke: { color: { label: "Stroke" } },
    strokeWidth: { number: { label: "Stroke Width" } },
    markerColor: { color: { label: "Marker Color" } },
    markerSize: { number: { label: "Marker Size" } },
    bg: { color: { label: "Background" } },
  },
  examples: [
    {
      title: "World",
      props: { props: { lat: 0, lng: 0, zoom: 3 } },
    },
    {
      title: "Paris",
      props: { props: { lat: 48.8566, lng: 2.3522, zoom: 10 } },
    },
    {
      title: "New York",
      props: { props: { lat: 40.7128, lng: -74.006, zoom: 300 } },
    },
  ],
  component: ({ src = def, lat, lng, zoom, bg, fill, markerColor, markerSize, stroke, strokeWidth }) => {
    const coordinates: [number, number] = [lng, lat];
    const [handle] = useState(() => delayRender("Loading Map"));
    const [geography, setGeography] = useState(null);

    useEffect(() => {
      fetch(getSrc(src))
        .then((res) => res.json())
        .then((data) => {
          setGeography(data);
          continueRender(handle);
        })
        .catch((err) => {
          console.log("Map failed to load", err);
          continueRender(handle);
        });
    }, [src]);

    if (!geography) return null;
    return (
      <ComposableMap
        style={{
          width: "100%",
          height: "100%",
          background: bg,
        }}
        projectionConfig={{ center: coordinates, scale: zoom }}
      >
        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />)
          }
        </Geographies>
        {markerSize && markerColor && <Marker coordinates={coordinates}>{markerSize && <circle r={markerSize / 2} fill={markerColor} />}</Marker>}
      </ComposableMap>
    );
  },
};
