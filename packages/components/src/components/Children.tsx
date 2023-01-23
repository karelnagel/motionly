import { ComponentProps } from "@asius/base";
import { Series, useVideoConfig } from "remotion";
import { Component } from "../Component";

export const Children = ({
  childs,
  isSequence,
}: {
  childs: ComponentProps[];
  isSequence?: boolean;
}) => {
  if (!isSequence) {
    return (
      <>
        {childs.map((child, index) => (
          <Component key={index} {...child} />
        ))}
      </>
    );
  }

  const { fps } = useVideoConfig();
  return (
    <Series>
      {childs.map((child, index) => (
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
