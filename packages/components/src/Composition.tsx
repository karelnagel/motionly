import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { useSelected } from "./SelectedContext";
import { Color, ComponentProps, getFonts } from "@asius/base";
import { useColors } from "./useColors";
import { useFonts } from "./useFonts";

export const Composition = ({
  comps,
  background,
}: {
  comps: ComponentProps[];
  background?: Color;
}) => {
  const { setSelected } = useSelected();
  const color = useColors();
  useFonts(getFonts(comps) || []);
  return (
    <AbsoluteFill
      style={{ background: color(background) }}
      onClick={() => setSelected("template")}
    >
      {comps.map((comp, index) => {
        return <Component key={index} {...comp} />;
      })}
    </AbsoluteFill>
  );
};
