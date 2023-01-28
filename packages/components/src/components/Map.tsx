import axios from "axios";
import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { continueRender, delayRender } from "remotion";
import { StyleAndClass } from "@motionly/base";
import { MapProps } from "@motionly/base";
import { useColors } from "../useColors";
import { getSrc } from "../helpers";

export const defaultMapProps: MapProps = {
  comp: "map",
  lat: 48.85,
  lng: 2.29,
  zoom: 300,
  markerColor: {
    type: "basic",
    color: "#00FFFFFF",
  },
  markerSize: 20,
  fill: {
    type: "basic",
    color: "#FF00FFFF",
  },
  stroke: {
    type: "basic",
    color: "#FFFF00FF",
  },
  strokeWidth: 2,
};

export const Map = ({
  zoom,
  fill,
  src = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json",
  stroke,
  strokeWidth,
  style,
  className,
  bg: background,
  lat,
  lng,
  markerColor,
  markerSize,
}: MapProps & StyleAndClass) => {
  const coordinates: [number, number] = [lng, lat];
  const [handle] = useState(() => delayRender());
  const [geography, setGeography] = useState(null);
  const getColor = useColors();

  useEffect(() => {
    const effect = async () => {
      try {
        const res = await axios.get(getSrc(src), { timeout: 2000 });
        setGeography(res.data);
        continueRender(handle);
      } catch (err) {
        console.log("Map failed to load", err);
        continueRender(handle);
      }
    };
    effect();
  }, [src]);

  if (!geography) return null;
  return (
    <ComposableMap
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: getColor(background),
        ...style,
      }}
      projectionConfig={{ center: coordinates, scale: zoom }}
    >
      <Geographies geography={geography}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={getColor(fill)}
              stroke={getColor(stroke)}
              strokeWidth={strokeWidth}
            />
          ))
        }
      </Geographies>
      {markerSize && markerColor && (
        <Marker coordinates={coordinates}>
          {markerSize && (
            <circle r={markerSize / 2} fill={getColor(markerColor)} />
          )}
        </Marker>
      )}
    </ComposableMap>
  );
};
