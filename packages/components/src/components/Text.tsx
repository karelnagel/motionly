import { StyleAndClass } from "@motionly/base";
import { TextProps } from "@motionly/base";
import { useMemo } from "react";
import { useTextStyles } from "../helpers/useTextStyles";

export const defaultTextProps: TextProps = {
  comp: "text",
  textStyle: {
    bg: {
      type: "basic",
      color: "#000000FF",
    },
    color: {
      type: "basic",
      color: "#00FFFFFF",
    },
    fontSize: 120,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
  },
  text: "Hello World",
  justifyContent: "center",
};

export const Text = ({ textStyle, text, style, className, justifyContent }: TextProps & StyleAndClass) => {
  const styles = useTextStyles(textStyle);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent,
        height: "100%",
        width: "100%",
      }}
    >
      <p
        className={className}
        style={{
          ...styles,
          width: "100%",
          whiteSpace: "pre-wrap",
          ...style,
        }}
      >
        {text}
      </p>
    </div>
  );
};
