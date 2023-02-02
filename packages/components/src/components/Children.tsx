import { Series, useVideoConfig } from "remotion";
import { Component } from "../Component";
import { useComponents } from "../hooks/useComponents";

export const Children = ({
  childIds,
  isSequence,
}: {
  childIds?: string[];
  isSequence?: boolean;
}) => {
  const { fps } = useVideoConfig();
  const components = useComponents();
  if (!childIds) return null;
  if (!isSequence) {
    return (
      <>
        {childIds.map((id) => (
          <Component key={id} {...components[id]} />
        ))}
      </>
    );
  }

  return (
    <Series>
      {childIds.map((id) => {
        const child = components[id];
        return (
          <Series.Sequence
            key={id}
            offset={child.from ? Math.floor(child.from * fps) : undefined}
            layout="none"
            durationInFrames={
              child.duration ? Math.floor(child.duration * fps) : 1
            }
          >
            <Component {...child} from={0} duration={0} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};
