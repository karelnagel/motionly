import { CSSProperties } from "react";
import { DivType, ElementType, ImageType, TextType } from "../../types";

export const Element = ({
  element,
  selected,
  select,
  setElement,
}: {
  element: ElementType;
  selected?: string;
  select?: (id: string) => void;
  setElement: (element: ElementType) => void;
}) => {
  const style: CSSProperties = {
    position: "absolute",
    top: `${element.y}px`,
    left: `${element.x}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    cursor: "pointer",
    display: "flex",
    overflow: "hidden",
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
      onDrag={(e) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setElement({ ...element, x: (e.clientX - rect.left) * 4, y: (e.clientY - rect.top) * 4 });
      }}
      onClick={onClick}
    >
      {element.type === "div" && (
        <Div element={element} select={select} selected={selected} setElement={setElement} />
      )}
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
        objectFit: element.objectFit || "cover",
        borderRadius: `${element.borderRadius}px`,
      }}
    />
  );
};

export const Text = ({ element }: { element: TextType }) => {
  return (
    <p
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: element.backgroundColor,
        color: element.color,
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

export const Div = ({
  element,
  select,
  selected,
  setElement,
}: {
  element: DivType;
  select?: (id: string) => void;
  selected?: string;
  setElement: (element: ElementType) => void;
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
        <Element
          key={index}
          element={child}
          select={select}
          selected={selected}
          setElement={setElement}
        />
      ))}
    </div>
  );
};
