import { CompProps } from "..";
import { DEFAULT_TRANSCRIPTION } from "./transcription";

const videoUrl = "https://remotionlambda-24lixyhuqn.s3.us-east-1.amazonaws.com/video.mp4"
export const defaultComponents: CompProps[] = [
    {
        id: "bg",
        type: "image",
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        objectFit: "cover",
        rotation: 0,
        borderRadius: 0,
        src: "https://picsum.photos/seed/13333/1920/1080",
        duration: 0, from: 0,
    },
    {
        id: "overlay",
        type: "div",
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        rotation: 0,
        borderRadius: 0,
        duration: 0, from: 0, children: [], backgroundColor: "#00000080"
    },
    {
        id: "title",
        type: "text",
        height: 0,
        width: 0,
        x: 0,
        y: 70,
        rotation: 0,
        borderRadius: 0,
        duration: 0, from: 0,
        text: "Title here",
        animation: { animation: "scale", duration: 1, type: "letter-by-letter" },
        textStyle: {
            fontSize: 100,
            outline: { color: "#ff00ff", width: 20 },
            color: "#000000",
            fontWeight: 900,
            textAlign: "center"
        }
    },
    {
        id: "video",
        type: "video",
        height: 400,
        width: 680,
        x: 200,
        y: 200,
        objectFit: "cover",
        rotation: 0,
        borderRadius: 40,
        src: videoUrl,
        duration: 0, from: 0, muted: false, startFrom: 0, volume: 1
    },
    {
        id: "transcription",
        type: "transcription",
        height: 240,
        width: 680,
        x: 200,
        y: 780,
        rotation: 0,
        borderRadius: 0,
        duration: 0, from: 0,
        words: DEFAULT_TRANSCRIPTION,
        animation: {
            type: "previous-text",
            textStyle: {
                outline: {
                    color: "#ffbf86",
                    width: 7
                },

            }
        },
        scrollType: "page-by-page",
        textStyle: {
            color: "#000000",
            fontSize: 60,
            outline: {
                color: "#ffffff",
                width: 7
            },
            lineHeight: 1.3,
            textAlign: "center",
            fontWeight: 700
        }
    },
    {
        id: "audiogram",
        type: "audiogram",
        height: 300,
        width: 1080,
        x: 0,
        y: 550,
        rotation: 0,
        borderRadius: 0,
        duration: 0, from: 0,
        src: videoUrl,
        barWidth: 30,
        color: "red",
        gap: 19,
        position: "center",
        roundness: 14,
        smoothing: true,
        mirror: true
    },
    {
        id: "bar1",
        type: "progressbar",
        height: 1080,
        width: 1080,
        x: 0,
        y: 0,
        rotation: 0,
        borderRadius: 0,
        duration: 0,
        from: 0,
        color: "red",
        progressBarType: "square",
        backgroundColor: "pink",
        barWidth: 30,
        corner: "top-left"
    }
]