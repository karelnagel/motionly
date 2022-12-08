import { ImageCompProps } from "..";

export const DEFAULT_IMAGE = (id: string): ImageCompProps => ({
    id,
    type: "image",
    height: 500,
    width: 500,
    x: 0,
    y: 0,
    objectFit: "cover",
    borderRadius: 10,
    src: `https://picsum.photos/seed/${id}/500/500`,
    from: 0, duration: -1, rotation: 0
})

