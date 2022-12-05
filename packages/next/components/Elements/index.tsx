/* eslint-disable jsx-a11y/alt-text */
"use client";
import { CSSProperties } from "react";
import { Rnd } from "react-rnd";
import { ElementType } from "@imageapi/types";
import { Div } from "./Div";
import { Text } from "./Text";
import { Image } from "./Image";
import { Sequence } from "remotion";

export const Element = ({
  element,
  selected,
  select,
  setElement,
  scale = 1,
  draggable,
  lockAspectRatio,
}: {
  element: ElementType;
  selected?: string;
  select?: (id: string) => void;
  setElement?: (element: ElementType) => void;
  scale?: number;
  draggable?: boolean;
  lockAspectRatio?: boolean;
}) => {
  const style: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    transform: `rotate(${element.rotation || 0}deg)`, // For some reason, this messes up x and y
  };
  const onClick = () => {
    select?.(element.id);
    console.log(element.id);
  };
  return (
    <Sequence
      from={element.from ? Math.floor(element.from * 30) : undefined}
      durationInFrames={element.duration ? Math.floor(element.duration * 30) : undefined}
    >
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
          onClick();
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
        <div style={{ ...style, width: `100%`, height: `100%` }}>
          {selected === element.id && (
            <div className=" absolute top-0 left-0 w-full h-full  border-blue-500 border-4" />
          )}
          {element.type === "div" && (
            <Div
              element={element}
              lockAspectRatio={lockAspectRatio}
              select={select}
              selected={selected}
              setElement={setElement}
              draggable={draggable}
              scale={scale}
            />
          )}
          {element.type === "image" && <Image element={element} />}
          {element.type === "text" && <Text element={element} />}
        </div>
      </Rnd>
    </Sequence>
  );
};
