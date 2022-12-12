import { CompProps } from "@asius/types";
import { baseComp, videoUrl } from "./consts";

const base: CompProps = {
    ...baseComp, type: "progressbar", height: 100, width: 1000, progressBarType: "line", barWidth: 20, color: "red", backgroundColor: "pink"
}

export const progressbars: CompProps[] = [
    {
        ...base, id: "line"
    },
    {
        ...base, id: "spotify", progressBarType: "spotify"
    },
    {
        ...base, id: "circle", progressBarType: "circle", height: 400, width: 400
    },
    {
        ...base, id: "square", progressBarType: "square"
    },
]