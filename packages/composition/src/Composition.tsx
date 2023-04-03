import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { useCompositionStore } from "./types";

export const Composition = () => {
  const background = useCompositionStore((s) => s.template?.background);
  const allComponents = useCompositionStore((s) => s.template?.allComponents);
  const setSelected = useCompositionStore((s) => s.setSelected);
  return (
    <AbsoluteFill style={{ background }} onClick={() => setSelected("")}>
      {allComponents?.map((c) => (
        <Component key={c} id={c} />
      ))}
    </AbsoluteFill>
  );
};
