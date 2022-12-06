/* eslint-disable @next/next/no-img-element */
"use client";
import { TextCompProps } from "../../types";

export const TextComp = ({ textStyle: { outline, ...textProps }, text }: TextCompProps) => {
  const shadowCount = 100;

  return (
    <p
      style={{
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        ...textProps,
        textShadow: outline
          ? new Array(shadowCount)
              .fill(0)
              .map(
                (_, i) =>
                  `${Math.cos(((i + 1) / shadowCount) * Math.PI * 2) * outline.width}px ${
                    Math.sin(((i + 1) / shadowCount) * Math.PI * 2) * outline.width
                  }px ${outline.color}`
              )
              .join(", ")
          : undefined,
      }}
    >
      {text}
    </p>
  );
};
