import { Div } from "./components/Div";
import { Text } from "./components/Text";
import { Image } from "./components/Image";
import { Sequence } from "remotion";
import { CompProps } from "@asius/types";
import { Audio } from "./components/Audio";
import { Audiogram } from "./components/Audiogram";
import { Graph } from "./components/Graph";
import { Map } from "./components/Map";
import { Mockup } from "./components/Mockup";
import { Progressbar } from "./components/Progressbar2";
import { QRCode } from "./components/QRCode";
import { Video } from "./components/Video";
import { Transcription } from "./components/Transcription";
import { Lottie } from "./components/Lottie";
import { Gif } from "./components/Gif";
import { Path } from "./components/Path";
import { useSelected } from "./SetSelectedContext";

export const Component = ({ comp }: { comp: CompProps }) => {
  const { setSelected, divRef, selected } = useSelected();
  return (
    <Sequence
      from={comp.from ? Math.floor(comp.from * 30) : undefined}
      durationInFrames={
        comp.duration ? Math.floor(comp.duration * 30) : undefined
      }
      layout="none"
    >
      <div
        ref={selected === comp.id ? divRef : undefined}
        onClick={(e) => {
          setSelected(comp.id);
          e.stopPropagation();
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          overflow: "hidden",
          width: comp.width || "100%",
          height: comp.height || "100%",
          position: "absolute",
          top: comp.y,
          left: comp.x,
          userSelect: "none",
          borderRadius: comp.borderRadius,
          transform: `rotate(${comp.rotation || 0}deg)`, // For some reason, this messes up x and y
        }}
      >
        {comp.type === "div" && <Div comp={comp} />}
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
