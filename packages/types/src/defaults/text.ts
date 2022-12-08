import { TextCompProps } from "..";

export const DEFAULT_TEXT = (id: string): TextCompProps => ({
    id,
    type: "text",
    height: 30,
    width: 100,
    x: 0,
    y: 0,
    textStyle: {
        backgroundColor: "#00000000",
        color: "#000000FF",
        fontSize: 28,
        fontFamily: "Inter",
        fontWeight: 700,
        textAlign: "left",
    },
    borderRadius: 0,
    text: "Hello World",
    rotation: 0,
    duration: -1, from: 0
});
