import { useEffect, useRef, useState } from "react";
import {
  continueRender,
  delayRender,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StyleAndClass } from "../types";
import { GraphProps } from "../types/components";

export const defaultGraphProps: GraphProps = {
  comp: "graph",
  type: "bar",
  src: [
    2, 5, 2, 9, 5, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20,
  ],
  color: "#0000FFFF",
  gap: 3,
  roundness: 10,
  animationDuration: 2,
  animationStart: 0,
};

export const Graph = ({
  color,
  src: values,
  max,
  style,
  className,
  animationDuration,
  animationStart,
  ...props
}: GraphProps & StyleAndClass) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxValue = max || Math.max(...values);

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    if (!ref.current?.parentElement) return;
    setHeight(ref.current.parentElement.offsetHeight);
    setWidth(ref.current.parentElement.offsetWidth);
    continueRender(handle);
  }, []);

  if (props.type === "bar")
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
                backgroundColor: color,
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
