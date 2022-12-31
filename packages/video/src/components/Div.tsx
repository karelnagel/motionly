import { DivCompProps } from "@asius/types";
import { Component } from "../Component";

export const DivComp = ({ comp }: { comp: DivCompProps }) => {
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
        <Component key={index} comp={child} />
      ))}
    </div>
  );
};
