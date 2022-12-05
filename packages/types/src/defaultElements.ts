import { ElementType } from ".";

export const DEFAULT_ELEMENTS: ElementType[] = [
    {
        id: "bg",
        type: "image",
        height: 1080,
        width: 1920,
        x: 0,
        y: 0,
        objectFit: "cover",
        rotation: 0,
        borderRadius: 0,
        src: "https://picsum.photos/seed/1/1920/1080",
        duration: 0, from: 0
    },
    {
        id: "container",
        type: "div",
        height: 400,
        width: 600,
        rotation: 0,
        x: 240,
        y: 340,
        backgroundColor: "#FFFFFFFF",
        borderRadius: 30,
        duration: 0, from: 0,
        children: [
            {
                id: "profile_image",
                type: "image",
                height: 80,
                width: 80,
                x: 20,
                y: 20,
                objectFit: "cover",
                rotation: 0,
                borderRadius: 100,
                src: "https://picsum.photos/seed/2/80/80",
                duration: 0, from: 0
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
                rotation: 0,
                fontSize: 28,
                fontFamily: "Inter",
                fontWeight: 700,
                text: "Your mom",
                textAlign: "left",
                duration: 0, from: 0
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
                rotation: 0,
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: 500,
                text: "@yourmom",
                textAlign: "left",
                duration: 0, from: 0
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
                rotation: 0,
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: 500,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                textAlign: "left",
                duration: 1, from: 0.2
            }
        ]
    }
]