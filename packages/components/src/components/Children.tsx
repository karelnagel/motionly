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
        {comps.map((comp) => (
          <Component key={comp.id} {...comp} />
        ))}
      </>
    );
  }

  return (
    <Series>
      {comps.map((comp) => {
        return (
          <Series.Sequence
            key={comp.id}
            offset={comp.from ? Math.ceil(comp.from * fps) : undefined}
            layout="none"
            durationInFrames={
              comp.duration ? Math.ceil(comp.duration * fps) : 1
            }
          >
            <Component {...comp} from={0} duration={0} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};
