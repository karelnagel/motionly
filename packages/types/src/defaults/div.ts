import { DivCompProps } from "..";

export const DEFAULT_DIV = (id: string): DivCompProps => ({
    id,
    type: "div",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    backgroundColor: "#FF0000FF",
    borderRadius: 100,
    rotation: 0,
    children: [],
    duration: -1, from: 0
});
