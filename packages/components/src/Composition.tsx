import { AbsoluteFill } from "remotion";
import { useSelected } from "./SelectedContext";
import { Color, getFonts, HasChildren } from "@asius/base";
import { useColors } from "./useColors";
import { useFonts } from "./useFonts";
import { Children } from "./components/Children";

export const Composition = ({
  comps = [],
  background,
  isSequence,
}: {
  background?: Color;
} & HasChildren) => {
  const { setSelected } = useSelected();
  const color = useColors();
  useFonts(getFonts(comps) || []);
  return (
    <AbsoluteFill
      style={{ background: color(background) }}
      onClick={() => setSelected("template")}
    >
      <Children comps={comps} isSequence={isSequence} />
    </AbsoluteFill>
  );
};
