export type SizeType = {
    width: number,
    height: number
}
export type BaseElementType = {
    id: string
    height: number
    width: number
    x: number
    y: number
    borderRadius: number
    rotation: number
}
export type TextType = {
    type: "text"
    fontSize: number
    fontFamily: string
    fontWeight: number
    text: string
    textAlign: string
    backgroundColor: string
    color: string
} & BaseElementType

export type ImageType = {
    type: "image"
    src: string
    objectFit: "cover" | "contain"
} & BaseElementType

export type DivType = {
    type: "div"
    backgroundColor: string
    children: ElementType[]
} & BaseElementType

export type ElementType = TextType | ImageType | DivType


