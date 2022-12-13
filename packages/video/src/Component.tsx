import { CSSProperties, useRef } from "react";
import { DivComp } from "./components/Div";
import { TextComp } from "./components/Text";
import { ImageComp } from "./components/Image";
import { Sequence } from "remotion";
import { CompProps, EditableProps } from "@asius/types";
import { AudioComp } from "./components/Audio";
import { AudiogramComp } from "./components/Audiogram";
import { GraphComp } from "./components/Graph";
import { MapComp } from "./components/Map";
import { MockupComp } from "./components/Mockup";
import { ProgressBarComp } from "./components/ProgressBar";
import { QRCodeComp } from "./components/QRCode";
import { VideoComp } from "./components/Video";
import { TranscriptionComp } from "./components/Transcription";
import Moveable from "react-moveable";
import { LottieComp } from "./components/Lottie";
import { GifComp } from "./components/Gif";

export const Component = ({ comp, edit }: { comp: CompProps; edit?: EditableProps }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const style: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
    width: comp.width || "100%",
    height: comp.height || "100%",
    position: "absolute",
    top: comp.y,
    left: comp.x,
    borderRadius: comp.borderRadius,
    transform: `rotate(${comp.rotation || 0}deg)`, // For some reason, this messes up x and y
  };
  return (
    <Sequence
      from={comp.from ? Math.floor(comp.from * 30) : undefined}
      durationInFrames={comp.duration ? Math.floor(comp.duration * 30) : undefined}
      layout="none"
    >
      {edit?.selected === comp.id && (
        <Moveable
          target={divRef}
          scale={edit.scale}
          draggable={true}
          resizable={true}
          rotatable={true}
          bounds=""
          size={{
            width: divRef.current?.getBoundingClientRect().width || 0,
            height: divRef.current?.getBoundingClientRect().height || 0,
          }}
          position={{
            x: comp.x,
            y: comp.y,
          }}
          onDrag={(e) => {
            console.log(e);
            edit?.setComp({
              ...comp,
              x: comp.x + e.beforeDelta[0],
              y: comp.y + e.beforeDelta[1],
            });
          }}
          keepRatio={edit?.lockAspectRatio}
          onResize={(e) => {
            console.log(e);
            edit.setComp({
              ...comp,
              width: e.width,
              height: e.height,
              x: comp.x + e.drag.beforeDelta[0],
              y: comp.y + e.drag.beforeDelta[1],
            });
          }}
          onRotate={(e) => {
            edit?.setComp({ ...comp, rotation: e.absoluteRotation });
          }}
        />
      )}
      <div
        ref={divRef}
        onClick={(e: any) => {
          edit?.select(comp.id);
          e.stopPropagation();
        }}
        style={style}
      >
        {comp.type === "div" && <DivComp comp={comp} edit={edit} />}
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
      </div>
    </Sequence>
  );
};
