import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { Color, GraphTypes } from "../../../inputs";
import { Component } from "..";
import { SlGraph } from "react-icons/sl";

export const GraphProps = z.object({
  comp: z.literal("graph"),
  src: z.array(z.number()),
  color: Color.optional(),
  type: GraphTypes,
  max: z.number().optional(),
  min: z.number().optional(),
  animationStart: z.number().optional(),
  animationDuration: z.number().optional(),
  strokeWidth: z.number().optional(),
  gap: z.number().optional(),
  roundness: z.number().min(0).optional(),
  width: z.number().min(0),
  height: z.number().min(0),
});
export type GraphProps = z.infer<typeof GraphProps>;

export const graph: Component<GraphProps> = {
  zod: GraphProps,
  Icon: SlGraph,
  hue: 220,
  inputs: {
    src: { text: { label: "Source" } },
    color: { color: { label: "Color" } },
    type: { select: { label: "Type", options: "graph-types" } },
    max: { number: { label: "Max" } },
    min: { number: { label: "Min" } },
    animationStart: { number: { label: "Animation Start" } },
    animationDuration: { number: { label: "Animation Duration" } },
    strokeWidth: { number: { label: "Stroke Width" } },
    gap: { number: { label: "Gap" } },
    roundness: { number: { label: "Roundness" } },
  },
  component: ({ src, comp, height, type, width, animationDuration, animationStart, color, gap, max, min, roundness, strokeWidth }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const background = color;
    const maxValue = max || Math.max(...src);

    if (type === "bar")
      return (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "end",
            gap,
          }}
        >
          {src.map((v, i) => {
            const anim =
              animationDuration && animationStart !== undefined
                ? spring({
                    frame: frame - animationStart * fps - ((animationDuration * fps) / src.length) * i,
                    fps,
                  })
                : 1;
            return (
              <div
                key={i}
                style={{
                  width: width / src.length,
                  height: height * (v / maxValue) * anim,
                  background,
                  borderRadius: roundness,
                }}
              />
            );
          })}
        </div>
      );
    else if (type === "line") {
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
        >
          <path
            d={src
              .slice(0, Math.floor(src.length * anim))
              .map((v, i) => {
                const x = (width / src.length) * i;
                const y = height - height * (v / maxValue);
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            stroke={background}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>
      );
    }
    return null;
  },
};
