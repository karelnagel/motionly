import { useCurrentFrame, useVideoConfig } from "remotion";
import { StyleAndClass } from "@asius/base";
import { ProgressbarProps } from "@asius/base";

export const defaultProgressbarProps: ProgressbarProps = {
  comp: "progressbar",
  barWidth: 30,
  topRight: false,
  color: "#ff00ffff",
  bg: "#0000FFFF",
  type: "square",
};

export const Progressbar = ({
  color,
  bg: background,
  style,
  className,
  height = 0,
  width = 0,
  ...props
}: ProgressbarProps & StyleAndClass) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * 100;

  if (props.type === "line")
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background,
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor: color,
            width: `${progress}%`,
          }}
        />
      </div>
    );

  if (props.type === "spotify")
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          position: "relative",
          margin: `0 ${height / 2}px`,
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: height / 2,
            borderRadius: height / 4,
            left: 0,
            background,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: color,
              position: "absolute",
              left: 0,
              height: "100%",
            }}
          />
        </div>
        <div
          style={{
            borderRadius: "100%",
            height,
            position: "absolute",
            width: height,
            background: color,
            left: `${progress}%`,
            transform: "translate(-50%, 0)",
          }}
        />
      </div>
    );
  if (props.type === "circle") {
    const size = Math.min(width, height);
    const radius = (size - (props.barWidth || 1)) / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = circumference * (progress / 100);
    return (
      <svg viewBox={`0 0 ${size} ${size}`} style={style} className={className}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={background}
          strokeWidth={props.barWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={props.barWidth}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash].join(" ")}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (props.type === "square")
    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          ...style,
        }}
        className={className}
      >
        {[1, 2, 3, 4].map((n) => {
          const horizontal = n % 2 === 0;
          const left = props.topRight ? n < 3 : n > 2;
          const top = n < 3;
          return (
            <div
              key={n}
              style={{
                width: horizontal ? props.barWidth : `${progress}%`,
                backgroundColor: color,
                height: horizontal ? `${progress}%` : props.barWidth,
                position: "absolute",
                top: !top ? 0 : undefined,
                left: left ? 0 : undefined,
                bottom: !top ? undefined : 0,
                right: left ? undefined : 0,
              }}
            />
          );
        })}
      </div>
    );
  return null;
};
