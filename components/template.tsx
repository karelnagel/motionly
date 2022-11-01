import { CSSProperties } from "react";
import { DivType, ElementType, ImageType, TemplateType, TextType } from "../types";

export const Template = ({
  template: { width, height, elements, id },
  modifications,
}: {
  template: TemplateType;
  modifications: ElementType[];
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
        return <Element key={index} element={modifiedElement} />;
      })}
    </div>
  );
};
export const Element = ({ element }: { element: ElementType }) => {
  const style: CSSProperties = {
    position: "absolute",
    top: `${element.y}px`,
    left: `${element.x}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    borderRadius: `${element.borderRadius}px`,
  };
  if (element.type === "text") return <Text style={style} element={element} />;
  if (element.type === "image") return <Image style={style} element={element} />;
  if (element.type === "div") return <Div style={style} element={element} />;
  else return null;
};

export const Image = ({ style, element }: { style: CSSProperties; element: ImageType }) => {
  return (
    <img
      src={element.src}
      style={{
        ...style,
        objectFit: "contain",
      }}
    />
  );
};
export const Text = ({ style, element }: { style: CSSProperties; element: TextType }) => {
  return (
    <div
      style={{
        ...style,
        backgroundColor: element.backgroundColor,
        color: element.color,
      }}
    >
      {element.text}
    </div>
  );
};
export const Div = ({ style, element }: { style: CSSProperties; element: DivType }) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        backgroundColor: element.backgroundColor,
      }}
    >
      {element.children.map((child, index) => (
        <Element key={index} element={child} />
      ))}
    </div>
  );
};
