/* eslint-disable @next/next/no-img-element */
"use client";
import { hexToRGBA } from "../../helpers";
import { DivType, ElementType } from "@imageapi/types";
import { Element } from "./index";

export const Div = ({
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
        borderRadius: `${element.borderRadius || 0}px`,
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
