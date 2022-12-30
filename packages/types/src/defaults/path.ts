import { AudioCompProps, AudiogramCompProps, PathCompProps, videoUrl } from "..";

export const defaultPathProps: PathCompProps = {
    id: "",
    type: "path",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    borderRadius: 10,
    rotation: 0,
    from: 0, duration: 0,
    path: "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 - 45 0 1 215.1 109.9 L 315 10",
    animation: {
        duration: 10,
        from: 0,
        to: 20
    }
}
