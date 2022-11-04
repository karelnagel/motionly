"use client";
import { ElementType } from "../../types";
import { Element } from "./element";

export const Template = ({
  elements,
  modifications,
  selected,
  select,
  setElements,
  height,
  width,
}: {
  elements: ElementType[];
  modifications: ElementType[];
  select?: (id: string) => void;
  selected?: string;
  width: number;
  height: number;
  setElements: (template: ElementType[]) => void;
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
        const modifiedElement = {
          ...element,
          ...modifications.find((mod) => mod.id === element.id),
        };
        return (
          <Element
            key={index}
            element={modifiedElement}
            select={select}
            selected={selected}
            setElement={setElement}
          />
        );
      })}
    </div>
  );
};
