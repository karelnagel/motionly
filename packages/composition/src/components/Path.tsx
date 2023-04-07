import { evolvePath } from "@remotion/paths";
import { z } from "zod";
import { Color } from "@motionly/inputs";
import { Component } from ".";
import { IoIosBrush } from "react-icons/io";

export const PathProps = z.object({
  path: z.string(),
  stroke: Color.optional(),
  strokeWidth: z.number().min(0).optional(),
  viewBoxX: z.number().optional(),
  viewBoxY: z.number().optional(),
  viewBoxHeight: z.number().min(0).optional(),
  viewBoxWidth: z.number().min(0).optional(),
  fill: Color.optional(),
  isRound: z.boolean().optional(),
});

export type PathProps = z.infer<typeof PathProps>;
export const path: Component<PathProps> = {
  zod: PathProps,
  Icon: IoIosBrush,
  hue: 330,
  inputs: {
    path: { text: { label: "Path" } },
    stroke: { color: { label: "Stroke" } },
    strokeWidth: { number: { label: "Stroke Width" } },
    viewBoxX: { number: { label: "View Box X" } },
    viewBoxY: { number: { label: "View Box Y" } },
    viewBoxHeight: { number: { label: "View Box Height" } },
    viewBoxWidth: { number: { label: "View Box Width" } },
    fill: { color: { label: "Fill" } },
    isRound: { checkbox: { label: "Round" } },
  },
  component: ({ path, fill, isRound, stroke, strokeWidth, viewBoxHeight, viewBoxWidth, viewBoxX, viewBoxY }) => {
    const evolution = evolvePath(1, path);
    return (
      <svg viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`} style={{ height: "100%", width: "100%" }}>
        <path
          d={path}
          fill={fill || "none"}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={evolution.strokeDasharray}
          strokeDashoffset={evolution.strokeDashoffset}
          strokeLinecap={isRound ? "round" : "butt"}
        />
      </svg>
    );
  },
};
