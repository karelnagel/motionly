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
      className={`absolute bg-accent shadow-lg rounded-full aspect-square bubble ${
        className || ""
      }`}
      style={{
        animationDelay: `-${Math.random() * 122}s`,
        width: `${width}%`,
        top: `${top}%`,
        left: `${left}%`,
        ...style,
      }}
    />
  );
};
