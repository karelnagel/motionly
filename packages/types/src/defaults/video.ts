import { VideoProps, videoUrl } from "..";

export const defaultVideoProps: VideoProps = {
  id: "",
  type: "video",
  height: 500,
  width: 500,
  x: 0,
  y: 0,
  objectFit: "cover",
  borderRadius: 10,
  rotation: 0,
  startFrom: 0,
  src: videoUrl,
  muted: false,
  volume: 100,
  from: 0,
  duration: 0,
};
