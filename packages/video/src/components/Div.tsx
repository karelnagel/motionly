import { CompProps, DivCompProps, EditableProps } from "@asius/types";
import { Component } from "../Component";

export const DivComp = ({
  comp,
  edit,
}: {
  comp: DivCompProps;
  edit?: EditableProps;
}) => {
  const set = (newElement: CompProps) => {
    const elem = comp;
    elem.children = elem.children.map((e) => {
      if (e.id === edit?.selected) {
        return newElement;
      }
      return e;
    });
    edit?.setComp(elem);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: comp.background,
      }}
    >
      {comp.children.map((child, index) => (
        <Component
          key={index}
          comp={child}
          edit={edit ? { ...edit, setComp: set } : undefined}
        />
      ))}
    </div>
  );
};
