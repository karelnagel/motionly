import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { ComponentProps } from "./types";

export const Composition = ({
  comps,
  background,
}: {
  comps: ComponentProps[];
  background?: string;
}) => {
  return (
    <AbsoluteFill style={{ background }}>
      {comps.map((comp, index) => {
        return <Component key={index} {...comp} />;
      })}
    </AbsoluteFill>
  );
};
