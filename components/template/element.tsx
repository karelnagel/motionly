/* eslint-disable @next/next/no-img-element */
"use client";
import { CSSProperties } from "react";
import { Rnd } from "react-rnd";
import { hexToRGBA } from "../../helpers";
import { DivType, ElementType, ImageType, TextType } from "../../types";

export const Element = ({
  element,
  selected,
  select,
  setElement,
  scale = 1,
  draggable = false,
  lockAspectRatio,
}: {
  element: ElementType;
  selected?: string;
  select?: (id: string) => void;
  setElement: (element: ElementType) => void;
  scale?: number;
  draggable?: boolean;
  lockAspectRatio: boolean;
}) => {
  const style: CSSProperties = {
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
  };
  const onClick = () => {
    select?.(element.id);
    console.log(element.id);
  };
  if (draggable)
    return (
      <Rnd
        style={style}
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
          setElement({ ...element, x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          setElement({
            ...element,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          });
        }}
      >
        {selected === element.id && (
          <div className=" absolute top-0 left-0 w-full h-full  border-blue-500 border-4" />
        )}
        {element.type === "div" && (
          <DivElement
            element={element}
            lockAspectRatio={lockAspectRatio}
            select={select}
            selected={selected}
            setElement={setElement}
            draggable={draggable}
            scale={scale}
          />
        )}
        {element.type === "image" && <ImageElement element={element} />}
        {element.type === "text" && <TextElement element={element} />}
      </Rnd>
    );
  else
    return (
      <div
        style={{
          ...style,
          position: "absolute",
          width: `${element.width}px`,
          height: `${element.height}px`,
          left: `${element.x}px`,
          top: `${element.y}px`,
        }}
        onClick={onClick}
      >
        {element.type === "div" && (
          <DivElement
            lockAspectRatio={lockAspectRatio}
            element={element}
            select={select}
            selected={selected}
            scale={scale}
            setElement={setElement}
            draggable={draggable}
          />
        )}
        {element.type === "image" && <ImageElement element={element} />}
        {element.type === "text" && <TextElement element={element} />}
      </div>
    );
};

export const ImageElement = ({ element }: { element: ImageType }) => {
  return (
    <img
      src={element.src}
      draggable={false}
      alt=""
      style={{
        height: "100%",
        width: "100%",
        objectFit: element.objectFit || "cover",
        borderRadius: `${element.borderRadius}px`,
      }}
    />
  );
};

export const TextElement = ({ element }: { element: TextType }) => {
  return (
    <p
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: hexToRGBA(element.backgroundColor),
        color: hexToRGBA(element.color),
        fontFamily: element.fontFamily,
        fontSize: `${element.fontSize}px`,
        lineHeight: `${element.fontSize}px`,
        padding: 0,
        margin: 0,
        fontWeight: element.fontWeight,
        borderRadius: `${element.borderRadius}px`,
        textAlign: element.textAlign as any,
      }}
    >
      {element.text}
    </p>
  );
};

export const DivElement = ({
  element,
  select,
  selected,
  setElement,
  draggable,
  scale,
  lockAspectRatio,
}: {
  element: DivType;
  select?: (id: string) => void;
  selected?: string;
  setElement: (element: ElementType) => void;
  draggable: boolean;
  scale: number;
  lockAspectRatio: boolean;
}) => {
  const set = (newElement: ElementType) => {
    let elem = element;
    elem.children = elem.children.map((e) => {
      if (e.id === selected) {
        return newElement;
      }
      return e;
    });
    setElement(elem);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: hexToRGBA(element.backgroundColor),
        borderRadius: `${element.borderRadius}px`,
      }}
    >
      {element.children.map((child, index) => (
        <Element
          lockAspectRatio={lockAspectRatio}
          key={index}
          element={child}
          select={select}
          selected={selected}
          setElement={set}
          draggable={draggable}
          scale={scale}
        />
      ))}
    </div>
  );
};
