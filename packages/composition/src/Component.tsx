import { Sequence, useVideoConfig } from "remotion";
import { useMemo } from "react";
import { Comp, components } from "@motionly/components";
import { useSelected } from "./useSelected";
import { Wrapper } from "@motionly/wrappers";

export const Component = (comp: Comp) => {
  const { fps } = useVideoConfig();
  const component = components[comp.type];
  const props = useMemo(() => component.zod.safeParse(comp.props), [comp.props]);
  const { setSelected, selectedRef, selected } = useSelected();
  const from = Math.max(0, Math.round((comp.from || 0) * fps));
  const duration = Math.max(1, Math.round((comp.duration || 0) * fps));
  return (
    <Sequence from={from} durationInFrames={duration} layout="none">
      <div
        ref={selected === comp.id ? selectedRef : null}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(comp.id);
        }}
        style={{
          overflow: "hidden",
          width: comp.width,
          height: comp.height,
          transform: `rotate(${comp.rotation}deg) translate(${comp.left || 0}px, ${comp.top || 0}px)`,
          opacity: comp.opacity,
          position: "absolute",
        }}
      >
        <Wrapper {...comp.wrappers}>
          {props.success ? (
            <component.component {...(props.data as any)} width={comp.width} height={comp.height} />
          ) : (
            <InvalidProps error={props.error.toString()} />
          )}
        </Wrapper>
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
