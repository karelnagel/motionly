import { CSSProperties } from "react";
import { DivType, ElementType, ImageType, TemplateType, TextType } from "../types";

export const Template = ({
  template: { width, height, elements, id },
  modifications,
  selected,
  select,
}: {
  template: TemplateType;
  modifications: ElementType[];
  select?: (id: string) => void;
  selected?: string;
}) => {
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
          <Element key={index} element={modifiedElement} select={select} selected={selected} />
        );
      })}
    </div>
  );
};
export const Element = ({
  element,
  selected,
  select,
}: {
  element: ElementType;
  selected?: string;
  select?: (id: string) => void;
}) => {
  const style: CSSProperties = {
    position: "absolute",
    top: `${element.y}px`,
    left: `${element.x}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    cursor: "pointer",
    display: "flex",
  };
  if (selected === element.id) {
    style.border = "1px solid red";
  }
  const onClick = () => {
    if (selected !== element.id) {
      select?.(element.id);
      console.log(element.id);
    }
  };
  return (
    <div
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      {element.type === "div" && <Div element={element} select={select} selected={selected} />}
      {element.type === "image" && <Image element={element} />}
      {element.type === "text" && <Text element={element} />}
    </div>
  );
};

export const Image = ({ element }: { element: ImageType }) => {
  return (
    <img
      src={element.src}
      style={{
        height: "100%",
        width: "100%",
        objectFit: "contain",
        borderRadius: `${element.borderRadius}px`,
      }}
    />
  );
};
export const Text = ({ element }: { element: TextType }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: element.backgroundColor,
        color: element.color,
        display: "flex",
        borderRadius: `${element.borderRadius}px`,
      }}
    >
      {element.text}
    </div>
  );
};
export const Div = ({
  element,
  select,
  selected,
}: {
  element: DivType;
  select?: (id: string) => void;
  selected?: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: element.backgroundColor,
        borderRadius: `${element.borderRadius}px`,
      }}
    >
      {element.children.map((child, index) => (
        <Element key={index} element={child} select={select} selected={selected} />
      ))}
    </div>
  );
};
