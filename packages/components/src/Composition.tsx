import { AbsoluteFill } from "remotion";
import { useSelected } from "./SelectedContext";
import { Color, ComponentProps, getFonts, HasChildren } from "@motionly/base";
import { useColor } from "./useColor";
import { useFonts } from "./useFonts";
import { Children } from "./components/Children";
import { ReactNode } from "react";

export const Composition = ({ comps = [], bg, isSequence }: HasChildren) => {
  return (
    <Background background={bg} comps={comps}>
      <Children comps={comps} isSequence={isSequence} />
    </Background>
  );
};

export const Background = ({
  background,
  children,
  comps,
}: {
  background?: Color;
  children: ReactNode;
  comps: ComponentProps[];
}) => {
  const { setSelected } = useSelected();
  useFonts(getFonts(comps));
  const bg = useColor(background);
  return (
    <AbsoluteFill
      style={{ background: bg }}
      onClick={() => setSelected("template")}
    >
      <>{children}</>
    </AbsoluteFill>
  );
};
