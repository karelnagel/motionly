import { Sequence, useVideoConfig } from "remotion";
import { ReactNode, useMemo } from "react";
import { components } from "./components";
import { Wrappers } from "./wrappers";
import { useCompositionStore } from ".";

export const Component = ({ id }: { id: string }) => {
  return (
    <Stuff id={id}>
      <Wrappers id={id}>
        <Component2 id={id} />
      </Wrappers>
    </Stuff>
  );
};

const Component2 = ({ id }: { id: string }) => {
  const type = useCompositionStore((s) => s.template?.components[id].type);
  const props = useCompositionStore((s) => s.template?.components[id].props);
  if (!type) return null;
  const component = components[type];
  const parsedProps = useMemo(() => component.zod.safeParse(props), [props]);
  if (!parsedProps.success) return <InvalidProps error={props.error.toString()} />;
  return <component.component {...(props.data as any)} />;
};

const Stuff = ({ children, id }: { children: ReactNode; id: string }) => {
  const { fps } = useVideoConfig();
  const isSelected = useCompositionStore((s) => s.selected === id);
  const setSelected = useCompositionStore((s) => s.setSelected);
  const selectedRef = useCompositionStore((s) => (isSelected ? s.selectedRef : null));
  const comp = useCompositionStore((s) => s.template?.components[id]);
  if (!comp) return null;
  const from = Math.max(0, Math.round((comp.from || 0) * fps));
  const duration = Math.max(1, Math.round((comp.duration || 0) * fps));
  return (
    <Sequence from={from} durationInFrames={duration} layout="none">
      <div
        ref={isSelected ? selectedRef : null}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(comp.id);
        }}
        style={{
          overflow: "hidden",
          width: comp.width,
          height: comp.height,
          transform: `rotate(${comp.rotation}deg) translate(${comp.x}px, ${comp.y}px)`,
          opacity: comp.opacity,
          position: "absolute",
        }}
      >
        <>{children}</>
      </div>
    </Sequence>
  );
};

const InvalidProps = ({ error }: { error: string }) => {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      Invalid props
      <pre>{error}</pre>
    </div>
  );
};
