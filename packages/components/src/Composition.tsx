import { AbsoluteFill } from "remotion";
import { useSelected } from "./hooks/useSelected";
import {
  Color,
  Components,
  getFonts,
  HasChildren,
} from "@motionly/base";
import { useColor } from "./hooks/useColor";
import { useFonts } from "./hooks/useFonts";
import { Children } from "./components/Children";
import { ReactNode } from "react";
import { ComponentsProvider } from "./hooks/useComponents";

export const Composition = ({
  childIds,
  bg,
  isSequence,
  components,
}: HasChildren & { components: Components }) => {
  useFonts(getFonts(components));
  return (
    <ComponentsProvider components={components}>
      <Background background={bg}>
        <Children childIds={childIds} isSequence={isSequence} />
      </Background>
    </ComponentsProvider>
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
