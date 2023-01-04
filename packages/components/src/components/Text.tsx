import { getTextStyle } from "../helpers";
import { StyleAndClass, TextStyle } from "../types";

export const TextAnimationTypes = {
  "word-by-word": "Word by word",
  "letter-by-letter": "Letter by letter",
  "line-by-line": "Line by line",
};
export const TextAnimationAnimations = {
  "fade-in": "Fade in",
  "slide-up": "Slide up",
  "slide-down": "Slide down",
  "slide-left": "Slide left",
  "slide-right": "Slide right",
  scale: "Scale",
};
export type TextAnimation = {
  type: keyof typeof TextAnimationTypes;
  duration: number;
  animation: keyof typeof TextAnimationAnimations;
};
export type TextProps = {
  type: "text";
  textStyle: TextStyle;
  text: string;
  animation?: TextAnimation;
};

export const defaultTextProps: TextProps = {
  type: "text",
  textStyle: {
    backgroundColor: "#00000000",
    color: "#000000FF",
    fontSize: 120,
    fontFamily: "Arial",
    fontWeight: 700,
    textAlign: "center",
  },
  text: "Hello World",
};

export const Text = ({
  textStyle,
  text,
  style,
  className,
}: TextProps & StyleAndClass) => {
  return (
    <p
      className={className}
      style={{
        ...getTextStyle(textStyle),
        height: "100%",
        width: "100%",
        ...style,
      }}
    >
      {text}
    </p>
  );
};