import { VideoCompProps } from "..";

export const DEFAULT_VIDEO = (id: string): VideoCompProps => ({
    id,
    type: "video",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    objectFit: "cover",
    borderRadius: 10,
    rotation: 0,
    startFrom: 0,
    src: `https://picsum.photos/seed/${id}/500/500`,
    muted: false,
    volume: 100,
    from: 0, duration: -1
});
