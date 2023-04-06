import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Color } from "@motionly/inputs";
import { Component } from "..";
import { IoIosTimer } from "react-icons/io";
import { useComponent } from "../../types";

export const ProgressbarTypes = z.enum(["spotify", "line", "circle", "square"]);
export type ProgressbarTypes = z.infer<typeof ProgressbarTypes>;
export const ProgressbarProps = z.object({
  type: ProgressbarTypes,
  color: Color.optional(),
  bg: Color.optional(),
  barWidth: z.number().min(0).optional(),
  topRight: z.boolean().optional(),
});
export type ProgressbarProps = z.infer<typeof ProgressbarProps>;

export const progressbar: Component<ProgressbarProps> = {
  zod: ProgressbarProps,
  Icon: IoIosTimer,
  hue: 350,
  inputs: {
    barWidth: { number: { label: "Bar Width" } },
    color: { color: { label: "Color" } },
    bg: { color: { label: "Background" } },
    topRight: { checkbox: { label: "Top Right" } },
    type: { select: { label: "Type", zod: ProgressbarTypes } },
  },
  examples: [
    {
      title: "Line",
      image: "/logo.png",
      props: { props: { type: "line" } },
    },
    {
      title: "Spotify",
      image: "/logo.png",
      props: { props: { type: "spotify" } },
    },
    {
      title: "Circle",
      image: "/logo.png",
      props: { props: { type: "circle" } },
    },
    {
      title: "Square",
      image: "/logo.png",
      props: { props: { type: "square" } },
    },
  ],
  component: ({ type, barWidth, bg, color, topRight, id }) => {
    const { height, width } = useComponent((s) => ({ height: s.height, width: s.width }), id)!;
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const progress = (frame / durationInFrames) * 100;

    if (type === "line")
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            background: bg,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              background: color,
              width: `${progress}%`,
            }}
          />
        </div>
      );

    if (type === "spotify")
      return (
        <div
          style={{
            width: "100%",
            height,
            display: "flex",
            alignItems: "center",
            position: "relative",
            padding: `0 ${height / 2}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: height / 2,
              borderRadius: height / 2,
              left: 0,
              background: bg,
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
              height: "100%",
              width: "100%",
              padding: `0 ${height / 2}px`,
              position: "relative",
            }}
          >
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
        </div>
      );
    if (type === "circle") {
      const size = Math.min(width, height);
      const radius = (size - (barWidth || 1)) / 2;
      const circumference = 2 * Math.PI * radius;
      const dash = circumference * (progress / 100);
      return (
        <svg viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke={bg} strokeWidth={barWidth} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={barWidth}
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeDasharray={[dash, circumference - dash].join(" ")}
            strokeLinecap="round"
          />
        </svg>
      );
    }
    if (type === "square")
      return (
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          {[1, 2, 3, 4].map((n) => {
            const horizontal = n % 2 === 0;
            const left = topRight ? n < 3 : n > 2;
            const top = n < 3;
            return (
              <div
                key={n}
                style={{
                  width: horizontal ? barWidth : `${progress}%`,
                  background: color,
                  height: horizontal ? `${progress}%` : barWidth,
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
  },
};
