import { DivType, ElementType, ImageType, TextType } from ".";

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
    color: "#000000",
    fontSize: 28,
    fontFamily: "Arial",
    fontWeight: "bold",
    text: "Hello World",
    textAlign: "left"
})

export const DEFAULT_DIV = (id: string) => <DivType>({
    id,
    type: "div",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    backgroundColor: "#FF0000",
    borderRadius: 100,
    children: []
})

export const DEFAULT_ELEMENTS: ElementType[] = [
    {
        id: "bg",
        type: "image",
        height: 1080,
        width: 1920,
        x: 0,
        y: 0,
        objectFit: "cover",
        borderRadius: 0,
        src: "https://picsum.photos/1920/1080",
    },
    {
        id: "container",
        type: "div",
        height: 400,
        width: 600,
        x: 240,
        y: 340,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        children: [
            {
                id: "profile_image",
                type: "image",
                height: 80,
                width: 80,
                x: 20,
                y: 20,
                objectFit: "cover",
                borderRadius: 100,
                src: "https://picsum.photos/80/80",

            },
            {
                id: "name",
                type: "text",
                height: 28,
                width: 500,
                x: 120,
                y: 27,
                backgroundColor: "#00000000",
                borderRadius: 100,
                color: "#000000",
                fontSize: 28,
                fontFamily: "Arial",
                fontWeight: "bold",
                text: "Your mom",
                textAlign: "left"
            },
            {
                id: "username",
                type: "text",
                height: 30,
                width: 500,
                x: 120,
                y: 62,
                backgroundColor: "transparent",
                borderRadius: 100,
                color: "#000000",
                fontSize: 24,
                fontFamily: "Arial",
                fontWeight: "normal",
                text: "@yourmom",
                textAlign: "left"
            },
            {
                id: "tweet",
                type: "text",
                height: 200,
                width: 550,
                x: 25,
                y: 130,
                backgroundColor: "transparent",
                borderRadius: 0,
                color: "#000000",
                fontSize: 24,
                fontFamily: "Arial",
                fontWeight: "normal",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                textAlign: "left"
            }


        ]
    }
]