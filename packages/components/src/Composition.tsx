import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { ComponentProps } from "./types";

export const Composition = ({ comps }: { comps: ComponentProps[] }) => {
  return (
    <AbsoluteFill>
      {comps.map((comp, index) => {
        return <Component key={index} {...comp} />;
      })}
    </AbsoluteFill>
  );
};
