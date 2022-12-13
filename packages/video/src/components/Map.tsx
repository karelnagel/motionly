import { MapCompProps } from "@asius/types";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { continueRender, delayRender } from "remotion";

export const MapComp = ({
  location,
  zoom,
  height,
  width,
  fill,
  mapUrl,
  stroke,
  strokeWidth,
  marker,
}: MapCompProps) => {
  const coordinates: [number, number] = [location.lng, location.lat];
  const url =
    mapUrl || "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  const [handle] = useState(delayRender());
  const [geography, setGeography] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((g) => g.json())
      .then((g) => {
        setGeography(g);
        continueRender(handle);
      })
      .catch();
  }, [url]);
  if (!geography) return null;
  return (
    <ComposableMap
      style={{ width, height }}
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
          <circle r={marker.size / 2} fill={marker.color} />
        </Marker>
      )}
    </ComposableMap>
  );
};
