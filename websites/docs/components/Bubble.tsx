import { CSSProperties } from "react";

export const Bubble = ({
  className,
  style,
  width: width,
  top,
  left,
}: {
  className?: string;
  style?: CSSProperties;
  width?: number;
  top?: number;
  left?: number;
}) => {
  return (
    <div
      className={`absolute bg-accent rounded-full aspect-square -z-0 ${className}`}
      style={{
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
        ...style,
      }}
    />
  );
};
