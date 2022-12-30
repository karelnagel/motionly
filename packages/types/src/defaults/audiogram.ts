import { AudiogramCompProps, videoUrl } from "..";

export const defaultAudiogramProps: AudiogramCompProps = {
    id: "",
    type: "audiogram",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    borderRadius: 10,
    rotation: 0,
    startFrom: 0,
    src: videoUrl,
    from: 0, duration: 0,
    barWidth: 10, gap: 1,
    position: "center",
    roundness: 5,
    color: "#000000",
    mirror: true,
    smoothing: true
}
