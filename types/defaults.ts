import { TemplateType } from ".";

export const DEFAULT_TEMPLATE: TemplateType = {
    id: "default",
    height: 1080,
    width: 1920,
    elements: [
        {
            type: "div",
            id: "div1",
            height: 1080,
            width: 1920,
            x: 0,
            y: 0,
            backgroundColor: "#00FF00",
            borderRadius: 0,
            children: [
                {
                    type: "text",
                    id: "text2",
                    height: 100,
                    width: 100,
                    x: 1820,
                    y: 980,
                    fontSize: 20,
                    fontFamily: "Arial",
                    fontWeight: "normal",
                    text: "Hello World",
                    textAlign: "center",
                    borderRadius: 0,
                    backgroundColor: "#FF0000",
                    color: "#000000",
                }
            ]
        },
        {
            type: "image",
            id: "image1",
            height: 500,
            width: 500,
            x: 0,
            y: 0,
            objectFit: "cover",
            borderRadius: 10,
            src: "https://picsum.photos/seed/sd/500/500"
        },
        {
            type: "text",
            id: "text1",
            height: 100,
            width: 100,
            x: 0,
            y: 0,
            backgroundColor: "#FF0000",
            borderRadius: 100,
            color: "#ffffff",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "normal",
            text: "Hello World",
            textAlign: "center"
        },
    ]
}