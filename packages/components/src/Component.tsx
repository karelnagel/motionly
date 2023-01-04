import { Div } from "./components/Div";
import { Text } from "./components/Text";
import { Image } from "./components/Image";
import { Sequence, useVideoConfig } from "remotion";
import { Audio } from "./components/Audio";
import { Audiogram } from "./components/Audiogram";
import { Graph } from "./components/Graph";
import { Map } from "./components/Map";
import { Mockup } from "./components/Mockup";
import { Progressbar } from "./components/Progressbar";
import { QRCode } from "./components/QRCode";
import { Video } from "./components/Video";
import { Transcription } from "./components/Transcription";
import { Lottie } from "./components/Lottie";
import { Gif } from "./components/Gif";
import { Path } from "./components/Path";
import { useSelected } from "./SelectedContext";
import { AnimationTypes, ComponentProps } from "./types";
import { useNewSpring } from "./spring";

export const Component = (comp: ComponentProps) => {
  const { fps } = useVideoConfig();

  return (
    <Sequence
      from={comp.from ? Math.floor(comp.from * fps) : undefined}
      durationInFrames={
        comp.duration ? Math.floor(comp.duration * fps) : undefined
      }
      layout="none"
    >
      <InsideSequence {...comp} />
    </Sequence>
  );
};
const InsideSequence = ({
  id,
  borderRadius,
  componentAnimations = [],
  duration,
  from,
  height,
  opacity,
  rotation,
  width,
  x,
  y,
  ...comp
}: ComponentProps) => {
  const { setSelected, divRef, selected } = useSelected();
  const { fps } = useVideoConfig();
  const spring = useNewSpring();
  const transformAnimations = componentAnimations
    .map(({ type, ...props }) => {
      const { units } = AnimationTypes[type];
      return `${type}(${spring({ ...props })}${units || ""})`;
    })
    .join(" ");

  return (
    <Sequence
      from={from ? Math.floor(from * fps) : undefined}
      durationInFrames={duration ? Math.floor(duration * fps) : undefined}
      layout="none"
    >
      <div
        ref={selected === id ? divRef : undefined}
        onClick={(e) => {
          setSelected(id);
          e.stopPropagation();
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          overflow: "hidden",
          width: width || "100%",
          height: height || "100%",
          position: "absolute",
          top: y,
          left: x,
          opacity,
          userSelect: "none",
          borderRadius,
          transform: `rotate(${rotation || 0}deg) ${transformAnimations}`, // For some reason, this messes up x and y
        }}
      >
        {comp.type === "div" && <Div {...comp} />}
        {comp.type === "image" && <Image {...comp} />}
        {comp.type === "text" && <Text {...comp} />}
        {comp.type === "audio" && <Audio {...comp} />}
        {comp.type === "audiogram" && <Audiogram {...comp} />}
        {comp.type === "graph" && <Graph {...comp} />}
        {comp.type === "map" && <Map {...comp} />}
        {comp.type === "mockup" && <Mockup {...comp} />}
        {comp.type === "progressbar" && <Progressbar {...comp} />}
        {comp.type === "qrcode" && <QRCode {...comp} />}
        {comp.type === "video" && <Video {...comp} />}
        {comp.type === "transcription" && <Transcription {...comp} />}
        {comp.type === "lottie" && <Lottie {...comp} />}
        {comp.type === "gif" && <Gif {...comp} />}
        {comp.type === "path" && <Path {...comp} />}
      </div>
    </Sequence>
  );
};
