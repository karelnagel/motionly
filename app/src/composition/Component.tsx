import { Sequence, useVideoConfig } from "remotion";
import { ReactNode } from "react";
import { components } from "./components";
import { Wrappers } from "./wrappers";
import { useComponent, useCompositionStore } from ".";

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
  const Component = useComponent((c) => components[c.type].component, id);
  const props = useComponent((c) => components[c.type].zod.safeParse(c.props), id);
  if (!props || !Component) return null;
  if (!props.success) return <InvalidProps error={props.error.toString()} />;
  return <Component {...(props.data as any)} id={id} />;
};

const Stuff = ({ children, id }: { children: ReactNode; id: string }) => {
  const { fps } = useVideoConfig();
  const isSelected = useCompositionStore((s) => s.component === id);
  const setSelected = useCompositionStore((s) => s.setComponent);
  const setRef = useCompositionStore((s) => s.setComponentRef);
  const comp = useComponent((c) => c, id);
  if (!comp) return null;
  const from = Math.max(0, Math.round((comp.from || 0) * fps));
  const duration = Math.max(1, Math.round((comp.duration || 0) * fps));
  return (
    <Sequence from={from} durationInFrames={duration} layout="none">
      <div
        ref={(ref) => {
          if (isSelected) setRef(ref as any);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(id);
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
