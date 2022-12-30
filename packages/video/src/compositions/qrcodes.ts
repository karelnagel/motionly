import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
    ...baseComp, type: "qrcode", text: videoUrl, color: "aqua", background: "black"
}

export const qrcodes: CompProps[] = [
    {
        ...base, id: "url",
    },
    {
        ...base, id: "text", text: "Hello world!"
    },
    {
        ...base, id: "wo-bg", background: undefined
    },

]