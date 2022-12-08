import { CSSProperties, useRef } from "react";
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
import { TranscriptionComp } from "./components/TranscriptionComp";
import Moveable from "react-moveable";
import React from "react";

export const Component = ({
  element,
  selected,
  select,
  setElement,
  scale = 1,
  lockAspectRatio,
}: {
  element: CompProps;
  selected?: string;
  select?: (id: string) => void;
  setElement?: (element: CompProps) => void;
  scale?: number;
  lockAspectRatio?: boolean;
}) => {
  const divRef = useRef(null);
  const style: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
    width: element.width,
    height: element.height,
    position: "absolute",
    top: element.y,
    left: element.x,
    borderRadius: element.borderRadius,
    transform: `rotate(${element.rotation || 0}deg)`, // For some reason, this messes up x and y
  };
  return (
    <Sequence
      from={element.from ? Math.floor(element.from * 30) : undefined}
      durationInFrames={element.duration ? Math.floor(element.duration * 30) : undefined}
      layout="none"
    >
      {selected === element.id && (
        <Moveable
          target={divRef}
          scale={scale}
          draggable={true}
          resizable={true}
          rotatable={true}
          bounds=""
          size={{
            width: element.width,
            height: element.height,
          }}
          position={{
            x: element.x,
            y: element.y,
          }}
          onDrag={(e) => {
            console.log(e);
            setElement?.({
              ...element,
              x: element.x + e.beforeDelta[0],
              y: element.y + e.beforeDelta[1],
            });
          }}
          keepRatio={lockAspectRatio}
          onResize={(e) => {
            console.log(e);
            setElement?.({
              ...element,
              width: e.width,
              height: e.height,
              x: element.x + e.drag.beforeDelta[0],
              y: element.y + e.drag.beforeDelta[1],
            });
          }}
          onRotate={(e) => {
            setElement?.({ ...element, rotation: e.absoluteRotation });
          }}
        />
      )}
      <div
        ref={divRef}
        onClick={(e: any) => {
          select?.(element.id);
          e.stopPropagation();
        }}
        style={style}
      >
        {element.type === "div" && (
          <DivComp
            element={element}
            lockAspectRatio={lockAspectRatio}
            select={select}
            selected={selected}
            setElement={setElement}
            scale={scale}
          />
        )}
        {element.type === "image" && <ImageComp {...element} />}
        {element.type === "text" && <TextComp {...element} />}
        {element.type === "audio" && <AudioComp {...element} />}
        {element.type === "audiogram" && <AudiogramComp {...element} />}
        {element.type === "graph" && <GraphComp {...element} />}
        {element.type === "map" && <MapComp {...element} />}
        {element.type === "mockup" && <MockupComp {...element} />}
        {element.type === "progressbar" && <ProgressBarComp {...element} />}
        {element.type === "qrcode" && <QRCodeComp {...element} />}
        {element.type === "video" && <VideoComp {...element} />}
        {element.type === "transcription" && <TranscriptionComp {...element} />}
      </div>
    </Sequence>
  );
};
