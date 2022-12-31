import { createContext, CSSProperties, useContext, useRef } from "react";
import { DivComp } from "./components/Div";
import { TextComp } from "./components/Text";
import { ImageComp } from "./components/Image";
import { Sequence } from "remotion";
import { CompProps } from "@asius/types";
import { AudioComp } from "./components/Audio";
import { AudiogramComp } from "./components/Audiogram";
import { GraphComp } from "./components/Graph";
import { MapComp } from "./components/Map";
import { MockupComp } from "./components/Mockup";
import { ProgressBarComp } from "./components/ProgressBar";
import { QRCodeComp } from "./components/QRCode";
import { VideoComp } from "./components/Video";
import { TranscriptionComp } from "./components/Transcription";
import { LottieComp } from "./components/Lottie";
import { GifComp } from "./components/Gif";
import { PathComp } from "./components/Path";
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
        {comp.type === "div" && <DivComp comp={comp} />}
        {comp.type === "image" && <ImageComp {...comp} />}
        {comp.type === "text" && <TextComp {...comp} />}
        {comp.type === "audio" && <AudioComp {...comp} />}
        {comp.type === "audiogram" && <AudiogramComp {...comp} />}
        {comp.type === "graph" && <GraphComp {...comp} />}
        {comp.type === "map" && <MapComp {...comp} />}
        {comp.type === "mockup" && <MockupComp {...comp} />}
        {comp.type === "progressbar" && <ProgressBarComp {...comp} />}
        {comp.type === "qrcode" && <QRCodeComp {...comp} />}
        {comp.type === "video" && <VideoComp {...comp} />}
        {comp.type === "transcription" && <TranscriptionComp {...comp} />}
        {comp.type === "lottie" && <LottieComp {...comp} />}
        {comp.type === "gif" && <GifComp {...comp} />}
        {comp.type === "path" && <PathComp {...comp} />}
      </div>
    </Sequence>
  );
};
