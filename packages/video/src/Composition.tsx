import { CompProps } from "@asius/types";
import { Component } from "./Component";

export const Composition = ({ comps }: { comps: CompProps[] }) => {
  return (
    <div style={{ position: "absolute", height: "100%", width: "100%" }}>
      {comps.map((comp, index) => {
        return <Component key={index} comp={comp} />;
      })}
    </div>
  );
};
