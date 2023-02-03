import { AbsoluteFill } from "remotion";
import { useSelected } from "./hooks/useSelected";
import {
  Color,
  ComponentProps,
  Components,
  getFonts,
  HasChildren,
} from "@motionly/base";
import { useColor } from "./hooks/useColor";
import { useFonts } from "./hooks/useFonts";
import { Children } from "./components/Children";
import { ReactNode, useMemo } from "react";

const toTree = (
  components: Components,
  childIds: string[]
): ComponentProps[] => {
  const tree = childIds.map((id) => {
    const comp = components[id];
    if ("childIds" in comp) {
      comp.comps = toTree(components, comp.childIds);
    }
    return comp;
  });
  return tree;
};

export const Composition = ({
  childIds,
  bg,
  isSequence,
  components,
}: HasChildren & { components: Components }) => {
  useFonts(getFonts(components));
  const comps = useMemo(
    () => toTree(components, childIds),
    [components, childIds]
  );
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
