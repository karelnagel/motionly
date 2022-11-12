import { DivType, ElementType, ImageType, TextType } from ".";

export const FONTS = ["Sono", "Inter", "Archivo", "Caveat", "Work Sans", "Roboto Mono", "Merriweather Sans", "Asap", "Montserrat", "Open Sans", "Yanone Kaffeesatz"]

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
    color: "#000000FF",
    fontSize: 28,
    fontFamily: "Inter",
    fontWeight: "700",
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
    backgroundColor: "#FF0000FF",
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
        backgroundColor: "#FFFFFFFF",
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
                color: "#000000FF",
                fontSize: 28,
                fontFamily: "Inter",
                fontWeight: "700",
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
                backgroundColor: "#00000000",
                borderRadius: 100,
                color: "#000000FF",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "500",
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
                backgroundColor: "#00000000",
                borderRadius: 0,
                color: "#000000FF",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "500",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                textAlign: "left"
            }


        ]
    }
]