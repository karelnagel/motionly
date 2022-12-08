import { CompProps } from "@asius/types";
import React from "react";
import { Component } from "./Component";

export const Composition = ({
  elements,
  selected,
  select,
  setElements,
  scale = 1,
  lockAspectRatio,
}: {
  elements: CompProps[];
  select?: (id: string) => void;
  selected?: string;
  setElements?: (template: CompProps[]) => void;
  scale?: number;
  lockAspectRatio?: boolean;
}) => {
  const setElement = (element: CompProps) => {
    const elems = elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setElements?.(elems);
  };
  return (
    <div style={{ position: "absolute" }}>
      {elements.map((element, index) => {
        return (
          <Component
            lockAspectRatio={!!lockAspectRatio}
            key={index}
            element={element}
            select={select}
            selected={selected}
            setElement={setElement}
            scale={scale}
          />
        );
      })}
    </div>
  );
};
