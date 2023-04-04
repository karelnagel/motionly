import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { CompositionProvider, Template, useCompositionStore } from "./types";

export const Composition = ({ setComponent, template }: { setComponent: (c?: string) => void; template: Template }) => {
  return (
    <CompositionProvider setComponent={setComponent} template={template}>
      <Items />
    </CompositionProvider>
  );
};

const Items = () => {
  const background = useCompositionStore((s) => s.template?.background);
  const allComponents = useCompositionStore((s) => s.template?.allComponents);
  const setSelected = useCompositionStore((s) => s.setComponent);
  return (
    <AbsoluteFill style={{ background }} onClick={() => setSelected("")}>
      {allComponents?.map((c) => (
        <Component key={c} id={c} />
      ))}
    </AbsoluteFill>
  );
};
