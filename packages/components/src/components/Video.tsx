import { OffthreadVideo, Video as RemotionVideo } from "remotion";
import { videoUrl } from "../helpers";
import { ObjectFitType } from "../types";

export type VideoProps = {
  type: "video";
  src: string;
  objectFit: ObjectFitType;
  startFrom?: number;
  muted?: boolean;
  volume?: number;
  offthread?: boolean;
};

export const defaultVideoProps: VideoProps = {
  type: "video",
  objectFit: "cover",
  startFrom: 0,
  src: videoUrl,
  muted: false,
  volume: 100,
};

export const Video = ({
  objectFit,
  offthread,
  muted,
  startFrom,
  volume,
  src,
}: VideoProps) => {
  const props = { muted, startFrom, volume, src };
  if (offthread)
    return (
      <OffthreadVideo
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
  else
    return (
      <RemotionVideo
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
};
