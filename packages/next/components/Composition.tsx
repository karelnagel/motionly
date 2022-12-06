"use client";
import { CompProps } from "../types";
import { Element } from "./Elements";

export const Composition = ({
  elements,
  selected,
  select,
  setElements,
  scale = 1,
  draggable = false,
  lockAspectRatio,
}: {
  elements: CompProps[];
  select?: (id: string) => void;
  selected?: string;
  setElements?: (template: CompProps[]) => void;
  scale?: number;
  draggable?: boolean;
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
          <Element
            lockAspectRatio={!!lockAspectRatio}
            key={index}
            element={element}
            select={select}
            selected={selected}
            setElement={setElement}
            draggable={draggable}
            scale={scale}
          />
        );
      })}
    </div>
  );
};
