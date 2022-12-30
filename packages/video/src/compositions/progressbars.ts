import { CompProps, ProgressBarCompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: ProgressBarCompProps = {
    ...baseComp, type: "progressbar", progressBarType: "line", height: 100, width: 1080, background: "pink", color: "red"
}

export const progressbars: CompProps[] = [
    {
        ...base, id: "line"
    },
    {
        ...base, id: "spotify", progressBarType: "spotify"
    },
    {
        ...base, id: "circle", progressBarType: "circle", height: 1080, barWidth: 40,
    },
    {
        ...base, id: "square", progressBarType: "square", height: 1080, barWidth: 40, corner: "top-left"
    },
]