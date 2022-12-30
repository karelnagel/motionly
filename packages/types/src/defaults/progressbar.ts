import { AudioCompProps, AudiogramCompProps, ProgressBarCompProps, videoUrl } from "..";

export const defaultProgressBar: ProgressBarCompProps = {
    id: "",
    type: "progressbar",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    borderRadius: 10,
    rotation: 0,
    from: 0, duration: 0,
    barWidth: 10,
    corner: "top-left",
    color: "#ff00ffff",
    progressBarType: "square"
}