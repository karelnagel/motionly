import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "map", location: { lat: 0, lng: 0 }, zoom: 200, fill: "blue", stroke: "white", strokeWidth: 1, animation: undefined, marker: { color: "red", size: 30 }
}

export const maps: CompProps[] = [
    {
        ...base, id: "base",
    },
    {
        ...base, id: "zoom-600", zoom: 600
    },
    {
        ...base, id: "zoom-700-eiffel", zoom: 5000, location: { lat: 48.8584, lng: 2.2945 }, mapUrl: "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/france/fr-departments.json"
    },
    {
        ...base, id: "zoom-900-liberty", zoom: 900, location: { lat: 40.6892, lng: -74.0444 }
    },
]
