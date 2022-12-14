import { CompProps } from "@asius/types";
import { DEFAULT_TRANSCRIPTION } from "@asius/types/src/defaults/transcription";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "transcription", y: 300, height: 400,
    animation: { textStyle: { color: "red" }, type: "current-word" },
    scrollType: "line-by-line",
    textStyle: { fontSize: 60, color: "black", lineHeight: 1.2, fontWeight: 800, textAlign: "center" },
    words: DEFAULT_TRANSCRIPTION
}

export const transcriptions: CompProps[] = [
    {
        ...base, id: "line-current-word",
    },
    {
        ...base, id: "page-previous-text", scrollType: "page-by-page", animation: {
            ...base.animation, type: "previous-text"
        }, textStyle: { ...base.textStyle, textAlign: "left" }
    },
    {
        ...base,
        id: "outline",
        textStyle: { ...base.textStyle, outline: { color: "white", width: 10 } },
        animation: { textStyle: { outline: { color: "red", width: 10 } }, type: "previous-text" }
    }
]