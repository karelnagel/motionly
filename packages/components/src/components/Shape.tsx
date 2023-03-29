import { Color, ShapeTypes, TriangleDirection } from "@motionly/inputs";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";
import { z } from "zod";
import { Component } from "..";

export const ShapeProps = z.object({
  fill: Color.optional(),
  stroke: Color.optional(),
  strokeWidth: z.number().min(0).optional(),
  width: z.number().min(0),
  height: z.number().min(0),
  type: ShapeTypes,
  cornerRadius: z.number().optional(),
  edgeRoundness: z.number().optional(),
  direction: TriangleDirection.optional(),
});

export type ShapeProps = z.infer<typeof ShapeProps>;

export const shape: Component<ShapeProps> = {
  zod: ShapeProps,
  inputs: {
    cornerRadius: { number: { label: "Corner Radius" } },
    edgeRoundness: { number: { label: "Edge Roundness" } },
    fill: { color: { label: "Fill" } },
    height: { number: { label: "Height" } },
    stroke: { color: { label: "Stroke" } },
    strokeWidth: { number: { label: "Stroke Width" } },
    type: { select: { label: "Type", options: "shape-types" } },
    width: { number: { label: "Width" } },
    direction: { select: { label: "Direction", options: "triangle-direction" } },
  },
  component: ({ type, height, width, cornerRadius, direction, edgeRoundness, fill, stroke, strokeWidth = 0 }) => {
    if (type === "triangle")
      return (
        <Triangle
          length={Math.min(width, height) - strokeWidth * 2}
          direction={direction || "up"}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          edgeRoundness={edgeRoundness}
          cornerRadius={edgeRoundness === undefined ? cornerRadius : undefined}
        />
      );
    if (type === "rect")
      return (
        <Rect
          height={height - strokeWidth * 2}
          width={width - strokeWidth * 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          edgeRoundness={edgeRoundness}
          cornerRadius={edgeRoundness === undefined ? cornerRadius : undefined}
        />
      );
    else if (type === "circle")
      return <Circle radius={Math.min(width, height) / 2 - strokeWidth} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    else if (type === "ellipse")
      return <Ellipse rx={width / 2 - strokeWidth} ry={height / 2 - strokeWidth} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    return null;
  },
};
