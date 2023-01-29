import { CSSProperties } from "react";

export const Bubble = ({
  className,
  style,
  height,
  top,
  left,
}: {
  className?: string;
  style?: CSSProperties;
  height?: number;
  top?: number;
  left?: number;
}) => {
  return (
    <div
      className={`absolute bg-accent rounded-full aspect-square ${className}`}
      style={{
        height: `${height}%`,
        top: `${top}%`,
        left: `${left}%`,
        ...style,
      }}
    />
  );
};
