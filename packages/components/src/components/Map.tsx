import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { continueRender, delayRender } from "remotion";
import { StyleAndClass } from "../types";

export type MapProps = {
  type: "map";
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  marker?: {
    color?: string;
    size?: number;
  };
  mapUrl?: string;
  background?: string;
};

export const defaultMapProps: MapProps = {
  type: "map",
  location: {
    lat: 48.85,
    lng: 2.29,
  },
  zoom: 300,
  marker: {
    color: "#FF0000",
    size: 20,
  },
  fill: "#0000FFFF",
  stroke: "#FFFFFFFF",
  strokeWidth: 2,
};

export const Map = ({
  location,
  zoom,
  fill,
  mapUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json",
  stroke,
  strokeWidth,
  marker,
  style,
  className,
  background,
}: MapProps & StyleAndClass) => {
  const coordinates: [number, number] = [location.lng, location.lat];
  const [handle] = useState(delayRender());
  const [geography, setGeography] = useState(null);

  useEffect(() => {
    fetch(mapUrl)
      .then((g) => g.json())
      .then((g) => {
        setGeography(g);
        continueRender(handle);
      })
      .catch();
  }, [mapUrl]);

  if (!geography) return null;
  return (
    <ComposableMap
      className={className}
      style={{ width: "100%", height: "100%", background, ...style }}
      projectionConfig={{ center: coordinates, scale: zoom }}
    >
      <Geographies geography={geography}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          ))
        }
      </Geographies>
      {marker && (
        <Marker coordinates={coordinates}>
          {marker.size && <circle r={marker.size / 2} fill={marker.color} />}
        </Marker>
      )}
    </ComposableMap>
  );
};
