import { CompProps, EditableProps } from "@asius/types";
import { Component } from "./Component";

export const Composition = ({ comps, edit }: { comps: CompProps[]; edit?: EditableProps }) => {
  // const setElement = (element: CompProps) => {
  //   const elems = elements.map((e) => {
  //     if (e.id === element.id) {
  //       return element;
  //     }
  //     return e;
  //   });
  //   setElements?.(elems);
  // };
  return (
    <div style={{ position: "absolute" }}>
      {comps.map((comp, index) => {
        return <Component edit={edit} key={index} comp={comp} />;
      })}
    </div>
  );
};
