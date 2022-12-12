import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "map", location: { lat: 0, lng: 0 }, zoom: 1, color: "red", backgroundColor: "pink", animation: undefined
}

export const maps: CompProps[] = [
    {
        ...base, id: "base",
    },
    {
        ...base, id: "zoom-4", zoom: 4
    },
    {
        ...base, id: "zoom-5-eiffel", zoom: 5, location: { lat: 48.8584, lng: 2.2945 }
    },
    {
        ...base, id: "zoom-10-liberty", zoom: 10, location: { lat: 40.6892, lng: -74.0444 }
    },
]
