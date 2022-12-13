import { CompProps } from "@asius/types";
import { baseComp } from "./consts";

const base: CompProps = {
    ...baseComp, type: "path", path: "M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
    strokeColor: "purple", strokeWidth: 10,
    viewBoxHeight: 100, viewBoxWidth: 200,
    animation: {
        duration: 3,
        from: 0, to: 1
    }
}

export const paths: CompProps[] = [
    {
        ...base, id: "base",
    },
    {
        ...base, id: "duration-10", duration: 10
    },
    {
        ...base, id: "to-half", animation: { ...base.animation, to: 0.5 }
    },
    {
        ...base, id: "from-half-rounded", animation: { ...base.animation, from: 0.5 }, strokeLinecap: "round"
    },

]