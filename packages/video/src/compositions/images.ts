import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "image", src: "https://picsum.photos/seed/idk/1920/1080", objectFit: "cover"
}

export const images: CompProps[] = [
    {
        ...base, id: "cover",
    },
    {
        ...base, id: "contain", objectFit: "contain"
    },
    {
        ...base, id: "fill", objectFit: "fill"
    },

]