import { CompProps, EditableProps } from "@asius/types";
import { Component } from "./Component";

export const Composition = ({ comps, edit }: { comps: CompProps[]; edit?: EditableProps }) => {
  return (
    <div style={{ position: "absolute", height: "100%", width: "100%" }}>
      {comps.map((comp, index) => {
        return <Component edit={edit} key={index} comp={comp} />;
      })}
    </div>
  );
};
