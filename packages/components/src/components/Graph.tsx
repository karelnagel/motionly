import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StyleAndClass } from "@motionly/base";
import { GraphProps } from "@motionly/base";
import { useColor } from "../useColor";

export const defaultGraphProps: GraphProps = {
  comp: "graph",
  type: "bar",
  src: [
    2, 5, 2, 9, 5, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20,
  ],
  color: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  gap: 3,
  roundness: 10,
  animationDuration: 2,
  animationStart: 0,
  width: 100,
  height: 100,
};

export const Graph = ({
  color,
  src: values,
  max,
  style,
  className,
  animationDuration,
  animationStart,
  width = 0,
  height = 0,
  ...props
}: GraphProps & StyleAndClass) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const background = useColor(color);
  const maxValue = max || Math.max(...values);

  if (props.type === "bar")
    return (
      <div
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
          const anim =
            animationDuration && animationStart !== undefined
              ? spring({
                  frame:
                    frame -
                    animationStart * fps -
                    ((animationDuration * fps) / values.length) * i,
                  fps,
                })
              : 1;
          return (
            <div
              key={i}
              style={{
                width: width / values.length,
                height: height * (v / maxValue) * anim,
                background,
                borderRadius: props.roundness,
              }}
            />
          );
        })}
      </div>
    );
  else if (props.type === "line") {
    const anim =
      animationDuration && animationStart !== undefined
        ? spring({
            frame: frame - animationStart * fps,
            fps,
            durationInFrames: animationDuration * fps,
            config: {
              damping: 100,
            },
          })
        : 1;
    return (
      <svg
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          stroke={background}
          strokeWidth={props.strokeWidth}
          fill="none"
        />
      </svg>
    );
  }
  return null;
};
