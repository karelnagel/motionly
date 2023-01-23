import { ShapeProps } from "@asius/base";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";
import { useColors } from "../useColors";

export const defaultShape: ShapeProps = {
  comp: "shape",
  type: "triangle",
  width: 100,
  height: 100,
  fill: "yellow",
  stroke: "black",
  strokeWidth: 2,
  edgeRoundness: 0,
  cornerRadius: 0,
  direction: "down",
};

export const Shape = (props: ShapeProps) => {
  const getColor = useColors();
  const fill = getColor(props.fill);
  const stroke = getColor(props.stroke);
  if (props.type === "triangle")
    return (
      <Triangle
        length={Math.min(props.width, props.height)}
        direction={props.direction}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
        edgeRoundness={props.edgeRoundness}
        cornerRadius={props.cornerRadius}
      />
    );
  if (props.type === "rect")
    return (
      <Rect
        height={props.height}
        width={props.width}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
        edgeRoundness={props.edgeRoundness}
        cornerRadius={props.cornerRadius}
      />
    );
  else if (props.type === "circle")
    return (
      <Circle
        radius={Math.min(props.width, props.height) / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  else if (props.type === "ellipse")
    return (
      <Ellipse
        rx={props.width / 2}
        ry={props.height / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  return null;
};
