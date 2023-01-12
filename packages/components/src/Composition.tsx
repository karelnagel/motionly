import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { useSelected } from "./SelectedContext";
import { ComponentProps } from "./types";

export const Composition = ({
  comps,
  background,
}: {
  comps: ComponentProps[];
  background?: string;
}) => {
  const { setSelected } = useSelected();
  return (
    <AbsoluteFill
      style={{ background }}
      onClick={() => setSelected("template")}
    >
      {comps.map((comp, index) => {
        return <Component key={index} {...comp} />;
      })}
    </AbsoluteFill>
  );
};
