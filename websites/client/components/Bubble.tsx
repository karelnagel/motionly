import { useMemo } from "react";
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
  const ran = useMemo(() => Math.random(), []);
  return (
    <div
      className={`absolute bg-accent shadow-lg rounded-full aspect-square bubble ${
        className || ""
      }`}
      style={{
        animationDelay: `-${ran * 122}s`,
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
        ...style,
      }}
    />
  );
};
