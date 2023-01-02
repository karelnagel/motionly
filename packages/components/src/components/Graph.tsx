import { GraphProps } from "@asius/types";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Graph = ({
  animation,
  color,
  values,
  height,
  width,
  max,
  ...props
}: GraphProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxValue = max || Math.max(...values);
  // const minValue = min || Math.min(...values);
  if (props.graphType === "bar")
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "end",
          gap: props.gap,
        }}
      >
        {values.map((v, i) => {
          const anim = animation
            ? spring({
                frame:
                  frame -
                  animation.start * fps -
                  ((animation.duration * fps) / values.length) * i,
                fps,
              })
            : 1;
          return (
            <div
              key={i}
              style={{
                width: width / values.length,
                height: height * (v / maxValue) * anim,
                backgroundColor: color,
                borderRadius: props.roundness,
              }}
            />
          );
        })}
      </div>
    );
  else if (props.graphType === "line") {
    const anim = animation
      ? spring({
          frame: frame - animation.start * fps,
          fps,
          durationInFrames: animation.duration * fps,
          config: {
            damping: 100,
          },
        })
      : 1;
    return (
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path
          d={values
            .slice(0, Math.floor(values.length * anim))
            .map((v, i) => {
              const x = (width / values.length) * i;
              const y = height - height * (v / maxValue);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          stroke={color}
          strokeWidth={props.strokeWidth}
          fill="none"
        />
      </svg>
    );
  }
  return null;
};
