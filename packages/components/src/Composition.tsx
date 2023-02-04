import { AbsoluteFill } from "remotion";
import { useSelected } from "./hooks/useSelected";
import { Color, ComponentProps, getFonts } from "@motionly/base";
import { useColor } from "./hooks/useColor";
import { useFonts } from "./hooks/useFonts";
import { Children } from "./components/Children";
import { ReactNode } from "react";

export const Composition = ({
  bg,
  isSequence,
  comps,
}: {
  comps?: ComponentProps[];
  bg?: Color;
  isSequence?: boolean;
}) => {
  useFonts(getFonts(comps));
  return (
    <Background background={bg}>
      <Children comps={comps} isSequence={isSequence} />
    </Background>
  );
};

export const Background = ({
  background,
  children,
}: {
  background?: Color;
  children: ReactNode;
}) => {
  const { setSelected } = useSelected();
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
