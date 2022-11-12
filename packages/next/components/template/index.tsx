"use client";
import { ElementType } from "@imageapi/types";
import { Element } from "./element";

export const Template = ({
  elements,
  selected,
  select,
  setElements,
  height,
  width,
  scale = 1,
  draggable = false,
  lockAspectRatio,
}: {
  elements: ElementType[];
  select?: (id: string) => void;
  selected?: string;
  width: number;
  height: number;
  setElements: (template: ElementType[]) => void;
  scale?: number;
  draggable?: boolean;
  lockAspectRatio: boolean;
}) => {
  const setElement = (element: ElementType) => {
    const elems = elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setElements(elems);
  };
  return (
    <div
      style={{
        display: "flex",
        width: `${width}px`,
        height: `${height}px`,
        margin: "0",
        padding: 0,
      }}
    >
      {elements.map((element, index) => {
        return (
          <Element
            lockAspectRatio={lockAspectRatio}
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
