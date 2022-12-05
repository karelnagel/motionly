import { DivType, ImageType, TextType, VideoType } from ".";


export const DEFAULT_IMAGE = (id: string) => <ImageType>({
    id,
    type: "image",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    objectFit: "cover",
    borderRadius: 10,
    src: `https://picsum.photos/seed/${id}/500/500`,
    from: 0, duration: -1
})
export const DEFAULT_VIDEO = (id: string) => <VideoType>({
    id,
    type: "video",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    objectFit: "cover",
    borderRadius: 10,
    rotation: 0,
    startFrom: 0,
    src: `https://picsum.photos/seed/${id}/500/500`,
    from: 0, duration: -1
})

export const DEFAULT_TEXT = (id: string) => <TextType>({
    id,
    type: "text",
    height: 30,
    width: 100,
    x: 0,
    y: 0,
    backgroundColor: "#00000000",
    borderRadius: 0,
    color: "#000000FF",
    fontSize: 28,
    fontFamily: "Inter",
    fontWeight: 700,
    text: "Hello World",
    rotation: 0,
    textAlign: "left",
    duration: -1, from: 0
})

export const DEFAULT_DIV = (id: string) => <DivType>({
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
})