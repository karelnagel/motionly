import { Color } from "@motionly/inputs";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";
import { z } from "zod";
import { Component } from "..";
import { IoShapesOutline } from "react-icons/io5";
import { useComponent } from "../../types";

export const TriangleDirection = z.enum(["up", "down", "left", "right"]);
export type TriangleDirection = z.infer<typeof TriangleDirection>;
export const ShapeTypes = z.enum(["rect", "triangle", "circle", "ellipse"]);
export type ShapeTypes = z.infer<typeof ShapeTypes>;
export const ShapeProps = z.object({
  fill: Color.optional(),
  stroke: Color.optional(),
  strokeWidth: z.number().min(0).optional(),
  type: ShapeTypes.optional(),
  cornerRadius: z.number().optional(),
  edgeRoundness: z.number().optional(),
  direction: TriangleDirection.optional(),
});

export type ShapeProps = z.infer<typeof ShapeProps>;

export const shape: Component<ShapeProps> = {
  zod: ShapeProps,
  Icon: IoShapesOutline,
  hue: 40,
  inputs: {
    cornerRadius: { number: { label: "Corner Radius" } },
    edgeRoundness: { number: { label: "Edge Roundness" } },
    fill: { color: { label: "Fill" } },
    stroke: { color: { label: "Stroke" } },
    strokeWidth: { number: { label: "Stroke Width" } },
    type: { select: { label: "Type", zod: ShapeTypes } },
    direction: { select: { label: "Direction", zod: TriangleDirection } },
  },
  examples: [
    {
      title: "Triangle",
      props: {
        props: {
          type: "triangle",
          fill: "#F00F00FF",
          cornerRadius: 20,
          direction: "up",
        },
      },
    },
    {
      title: "Square",
      props: {
        props: {
          type: "rect",
          fill: "#0000FFFF",
          cornerRadius: 20,
          direction: "up",
        },
      },
    },
    {
      title: "Circle",
      props: {
        props: {
          type: "circle",
          fill: "#ff0000FF",
          cornerRadius: 20,
          direction: "up",
        },
      },
    },
    {
      title: "Ellipse",
      props: {
        props: {
          type: "ellipse",
          fill: "#00FF00FF",
          cornerRadius: 20,
          direction: "up",
        },
      },
    },
  ],
  component: ({ id, type, cornerRadius, direction, edgeRoundness, fill, stroke, strokeWidth = 0 }) => {
    const { width, height } = useComponent((c) => ({ width: c.width, height: c.height }), id)!;
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
