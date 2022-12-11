import { TextStyle } from "@asius/types";
import { CSSProperties } from "react";

export const getTextStyle = ({ outline, ...textStyles }: TextStyle): CSSProperties => {
    const shadowCount = 100
    return {
        padding: 0,
        margin: 0,
        ...textStyles,
        textShadow: outline
            ? new Array(shadowCount)
                .fill(0)
                .map(
                    (_, i) =>
                        `${Math.cos(((i + 1) / shadowCount) * Math.PI * 2) * outline.width}px ${Math.sin(((i + 1) / shadowCount) * Math.PI * 2) * outline.width
                        }px ${outline.color}`
                )
                .join(", ")
            : undefined,
    }
}