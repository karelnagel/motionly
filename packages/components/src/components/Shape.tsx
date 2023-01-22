import { ShapeProps } from "@asius/base";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";

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
  direction: "bottom",
};

export const Shape = (props: ShapeProps) => {
  if (props.type === "triangle")
    return (
      <Triangle
        length={Math.min(props.width, props.height)}
        direction={props.direction}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        // edgeRoundness={props.edgeRoundness}
        // cornerRadius={props.cornerRadius}
      />
    );
  if (props.type === "rect")
    return (
      <Rect
        height={props.height}
        width={props.width}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        // edgeRoundness={props.edgeRoundness}
        // cornerRadius={props.cornerRadius}
      />
    );
  else if (props.type === "circle")
    return (
      <Circle
        radius={Math.min(props.width, props.height) / 2}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  else if (props.type === "ellipse")
    return (
      <Ellipse
        rx={props.width / 2}
        ry={props.height / 2}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  return null;
};
