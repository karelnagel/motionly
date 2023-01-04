import { useRef } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StyleAndClass } from "../types";

export const GraphTypes = {
  line: "Line",
  bar: "Bar",
  pie: "Pie",
};

export type GraphProps = {
  type: "graph";
  values: number[];
  color?: string;
  graphType: keyof typeof GraphTypes;
  max?: number;
  min?: number;
  animation?: {
    start: number;
    duration: number;
  };
} & (
  | {
      graphType: "line";
      strokeWidth: number;
    }
  | {
      graphType: "bar";
      gap?: number;
      roundness?: number;
    }
);

export const defaultGraphProps: GraphProps = {
  type: "graph",
  graphType: "bar",
  values: [
    2, 5, 2, 9, 5, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20,
  ],
  color: "#0000FFFF",
  gap: 3,
  roundness: 10,
  animation: {
    duration: 2,
    start: 0,
  },
};

export const Graph = ({
  animation,
  color,
  values,
  max,
  style,
  className,
  ...props
}: GraphProps & StyleAndClass) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxValue = max || Math.max(...values);

  const ref = useRef<HTMLDivElement>(null);
  const width = ref.current?.parentElement?.offsetWidth || 1;
  const height = ref.current?.parentElement?.offsetHeight || 1;

  if (props.graphType === "bar")
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "end",
          gap: props.gap,
          ...style,
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
      <svg
        ref={ref as any}
        viewBox={`0 0 ${width} ${height}`}
        style={style}
        className={className}
      >
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
