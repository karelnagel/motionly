import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "lottie", src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
}

export const lotties: CompProps[] = [
    {
        ...base, id: "base",
    },
    {
        ...base, id: "loop", loop: true
    },
    {
        ...base, id: "playbackrate-2", playbackRate: 2,
    },
    {
        ...base, id: "backward", direction: "backward",
    },
]
