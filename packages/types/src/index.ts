export * from "./defaults"
export * from "./defaultElements"

export interface SizeType {
    width: number,
    height: number
}

export interface BaseElementType {
    id: string
    height: number
    width: number
    x: number
    y: number
    borderRadius: number
    rotation: number
    from: number
    duration: number
}

export interface TextType extends BaseElementType {
    type: "text"
    fontSize: number
    fontFamily: string
    fontWeight: number
    text: string
    textAlign: string
    backgroundColor: string
    color: string
}
export interface ImageType extends BaseElementType {
    type: "image"
    src: string
    objectFit: ObjectFitType
}
export interface VideoType extends BaseElementType {
    type: "video"
    src: string
    objectFit: ObjectFitType
    startFrom: number
}
export interface DivType extends BaseElementType {
    type: "div"
    backgroundColor: string
    children: ElementType[]
}

export type ElementType = TextType | ImageType | DivType | VideoType
export const ObjectFit = {
    cover: "cover",
    contain: "contain",
    fill: "fill",
    none: "none",
    "scale-down": "scale-down"
}
export type ObjectFitType = keyof typeof ObjectFit
