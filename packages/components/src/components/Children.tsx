import { ComponentProps } from "@motionly/base";
import { Series, useVideoConfig } from "remotion";
import { Component } from "../Component";

export const Children = ({
  comps,
  isSequence,
}: {
  comps?: ComponentProps[];
  isSequence?: boolean;
}) => {
  const { fps } = useVideoConfig();
  if (!comps) return null;
  if (!isSequence) {
    return (
      <>
        {comps.map((child) => (
          <Component key={child.id} {...child} />
        ))}
      </>
    );
  }

  return (
    <Series>
      {comps.map((child) => (
        <Series.Sequence
          key={child.id}
          offset={child.from ? Math.floor(child.from * fps) : undefined}
          layout="none"
          durationInFrames={
            child.duration ? Math.floor(child.duration * fps) : 1
          }
        >
          <Component {...child} from={0} duration={0} />
        </Series.Sequence>
      ))}
    </Series>
  );
};
