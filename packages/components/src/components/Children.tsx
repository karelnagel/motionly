import { ComponentProps } from "@asius/base";
import { Series, useVideoConfig } from "remotion";
import { Component } from "../Component";

export const Children = ({
  comps,
  isSequence,
}: {
  comps?: ComponentProps[];
  isSequence?: boolean;
}) => {
  if (!comps) return null;
  if (!isSequence) {
    return (
      <>
        {comps.map((child, index) => (
          <Component key={index} {...child} />
        ))}
      </>
    );
  }

  const { fps } = useVideoConfig();
  return (
    <Series>
      {comps.map((child, index) => (
        <Series.Sequence
          key={index}
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
