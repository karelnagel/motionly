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
  animations = [],
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
  const transformAnimations = animations
    .map(({ type: comp, ...props }) => {
      const { units } = AnimationTypes[comp];
      return `${comp}(${spring({ ...props })}${units || ""})`;
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
        {comp.comp === "div" && <Div {...comp} />}
        {comp.comp === "image" && <Image {...comp} />}
        {comp.comp === "text" && <Text {...comp} />}
        {comp.comp === "audio" && <Audio {...comp} />}
        {comp.comp === "audiogram" && <Audiogram {...comp} />}
        {comp.comp === "graph" && <Graph {...comp} />}
        {comp.comp === "map" && <Map {...comp} />}
        {comp.comp === "mockup" && <Mockup {...comp} />}
        {comp.comp === "progressbar" && <Progressbar {...comp} />}
        {comp.comp === "qrcode" && <QRCode {...comp} />}
        {comp.comp === "video" && <Video {...comp} />}
        {comp.comp === "transcription" && <Transcription {...comp} />}
        {comp.comp === "lottie" && <Lottie {...comp} />}
        {comp.comp === "gif" && <Gif {...comp} />}
        {comp.comp === "path" && <Path {...comp} />}
      </div>
    </Sequence>
  );
};
