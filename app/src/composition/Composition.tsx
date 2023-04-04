import { useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { Component } from "./Component";
import { Template, useCompositionStore } from "./types";

export const Composition = ({
  component,
  setComponent,
  template,
}: {
  component?: string;
  setComponent: (c?: string) => void;
  template: Template;
}) => {
  const setTemplate = useCompositionStore((s) => s.setTemplate);
  const set = useCompositionStore((s) => s.setComponent);
  useEffect(() => {
    set(component);
  }, [component]);
  useEffect(() => {
    setTemplate(template);
  }, [template]);
  useEffect(() => {
    useCompositionStore.subscribe(
      (s) => s.component,
      (state) => {
        setComponent(state);
      }
    );
  }, [setComponent]);
  return <Items />;
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
