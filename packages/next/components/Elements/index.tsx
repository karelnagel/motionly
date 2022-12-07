/* eslint-disable jsx-a11y/alt-text */
"use client";
import { CSSProperties, ReactFragment } from "react";
import { Rnd } from "react-rnd";
import { DivComp } from "./Div";
import { TextComp } from "./Text";
import { ImageComp } from "./Image";
import { Sequence } from "remotion";
import { CompProps } from "../../types";
import { AudioComp } from "./Audio";
import { AudiogramComp } from "./Audiogram";
import { GraphComp } from "./Graph";
import { MapComp } from "./Map";
import { MockupComp } from "./Mockup";
import { ProgressBarComp } from "./ProgressBar";
import { QRCodeComp } from "./QRCode";
import { VideoComp } from "./Video";
import { TranscriptionComp } from "./Audiogram copy";

export const Element = ({
  element,
  selected,
  select,
  setElement,
  scale = 1,
  draggable,
  lockAspectRatio,
}: {
  element: CompProps;
  selected?: string;
  select?: (id: string) => void;
  setElement?: (element: CompProps) => void;
  scale?: number;
  draggable?: boolean;
  lockAspectRatio?: boolean;
}) => {
  return (
    <Sequence
      from={element.from ? Math.floor(element.from * 30) : undefined}
      durationInFrames={element.duration ? Math.floor(element.duration * 30) : undefined}
      layout="none"
    >
      <Wrapper
        draggable={draggable}
        element={element}
        lockAspectRatio={lockAspectRatio}
        scale={scale}
        select={select}
        selected={selected}
        setElement={setElement}
      >
        {element.type === "div" && (
          <DivComp
            element={element}
            lockAspectRatio={lockAspectRatio}
            select={select}
            selected={selected}
            setElement={setElement}
            draggable={draggable}
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
      </Wrapper>
    </Sequence>
  );
};

export const Wrapper = ({
  element,
  draggable,
  scale,
  lockAspectRatio,
  selected,
  setElement,
  select,
  children,
}: {
  element: CompProps;
  draggable?: boolean;
  scale: number;
  lockAspectRatio?: boolean;
  selected?: string;
  setElement?: (e: CompProps) => void;
  select?: (id: string) => void;
  children: ReactFragment;
}) => {
  const style: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
    width: `100%`,
    height: `100%`,
    borderRadius: element.borderRadius,
    transform: `rotate(${element.rotation || 0}deg)`, // For some reason, this messes up x and y
  };

  if (draggable)
    return (
      <Rnd
        scale={scale}
        lockAspectRatio={lockAspectRatio}
        disableDragging={selected !== element.id}
        enableResizing={selected === element.id}
        bounds=""
        size={{
          width: element.width,
          height: element.height,
        }}
        onClick={(e: any) => {
          select?.(element.id);
          e.stopPropagation();
        }}
        position={{
          x: element.x,
          y: element.y,
        }}
        onDrag={(e: any) => {
          e.stopImmediatePropagation();
        }}
        onDragStop={(e: any, d: any) => {
          e.stopImmediatePropagation();
          setElement?.({ ...element, x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          setElement?.({
            ...element,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          });
        }}
      >
        <div style={style}>
          {selected === element.id && (
            <div
              className=" absolute top-0 left-0 w-full h-full  border-blue-500 border-4"
              style={{ borderRadius: style.borderRadius }}
            />
          )}
          {children}
        </div>
      </Rnd>
    );
  else
    return (
      <div
        style={{
          ...style,
          width: element.width,
          height: element.height,
          position: "absolute",
          top: element.y,
          left: element.x,
        }}
      >
        {children}
      </div>
    );
};
