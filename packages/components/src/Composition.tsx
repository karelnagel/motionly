import { AbsoluteFill } from "remotion";
import { useSelected } from "./SelectedContext";
import { Color, getFonts, HasChildren } from "@motionly/base";
import { useColor } from "./useColor";
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
  const bg = useColor(background);
  useFonts(getFonts(comps));
  return (
    <AbsoluteFill
      style={{ background: bg }}
      onClick={() => setSelected("template")}
    >
      <Children comps={comps} isSequence={isSequence} />
    </AbsoluteFill>
  );
};
