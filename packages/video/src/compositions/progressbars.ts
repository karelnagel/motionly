import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
    ...baseComp, type: "progressbar", progressBarType: "line", barWidth: 10, color: "red", backgroundColor: "pink"
}

export const progressbars: CompProps[] = [
    {
        ...base, id: "line", height: 100
    },
    {
        ...base, id: "spotify", progressBarType: "spotify"
    },
    {
        ...base, id: "circle", progressBarType: "circle"
    },
    {
        ...base, id: "square", progressBarType: "square"
    },
]