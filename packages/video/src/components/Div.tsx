import { CompProps, DivCompProps } from "@asius/types";
import { Component } from "../Component";

export const DivComp = ({
  element,
  select,
  selected,
  setElement,
  draggable,
  scale,
  lockAspectRatio,
}: {
  element: DivCompProps;
  select?: (id: string) => void;
  selected?: string;
  setElement?: (element: CompProps) => void;
  draggable?: boolean;
  scale?: number;
  lockAspectRatio?: boolean;
}) => {
  const set = (newElement: CompProps) => {
    let elem = element;
    elem.children = elem.children.map((e) => {
      if (e.id === selected) {
        return newElement;
      }
      return e;
    });
    setElement?.(elem);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: element.backgroundColor,
      }}
    >
      {element.children.map((child, index) => (
        <Component
          lockAspectRatio={lockAspectRatio}
          key={index}
          element={child}
          select={select}
          selected={selected}
          setElement={set}
          scale={scale}
        />
      ))}
    </div>
  );
};
