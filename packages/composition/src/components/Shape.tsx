import { ShapeProps } from "@motionly/base";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";
import { useColor } from "../hooks/useColor";

export const defaultShapeProps: ShapeProps = {
  comp: "shape",
  type: "triangle",
  width: 100,
  height: 100,
  fill: {
    type: "basic",
    color: "#00FFFFFF",
  },
  stroke: {
    type: "basic",
    color: "#000000FF",
  },
  strokeWidth: 2,
  edgeRoundness: 0,
  cornerRadius: 0,
  direction: "down",
};

export const Shape = ({
  strokeWidth = 0,
  edgeRoundness,
  cornerRadius,
  width,
  height,
  direction,
  ...props
}: ShapeProps) => {
  const fill = useColor(props.fill);
  const stroke = useColor(props.stroke);

  if (props.type === "triangle")
    return (
      <Triangle
        length={Math.min(width, height) - strokeWidth * 2}
        direction={direction || "up"}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        edgeRoundness={edgeRoundness}
        cornerRadius={
          edgeRoundness === undefined ? cornerRadius : undefined
        }
      />
    );
  if (props.type === "rect")
    return (
      <Rect
        height={height - strokeWidth * 2}
        width={width - strokeWidth * 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        edgeRoundness={edgeRoundness}
        cornerRadius={
          edgeRoundness === undefined ? cornerRadius : undefined
        }
      />
    );
  else if (props.type === "circle")
    return (
      <Circle
        radius={Math.min(width, height) / 2 - strokeWidth}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  else if (props.type === "ellipse")
    return (
      <Ellipse
        rx={width / 2 - strokeWidth}
        ry={height / 2 - strokeWidth}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  return null;
};
