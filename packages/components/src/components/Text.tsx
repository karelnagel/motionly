import { StyleAndClass } from "@motionly/base";
import { TextProps } from "@motionly/base";
import { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { useAnimation } from "../useAnimations";
import { useTextStyles } from "../useTextStyles";

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
    fontWeight: 700,
    textAlign: "center",
  },
  text: "Hello World",
  justifyContent: "center",
};
function extractVariables(text: string): string[] {
  const regex = /{{([^}]+)}}/g;
  let match;
  const variables: string[] = [];
  while ((match = regex.exec(text))) {
    variables.push(match[1]);
  }
  return variables;
}
export const Text = ({
  textStyle,
  text,
  style,
  className,
  justifyContent,
  animations,
}: TextProps & StyleAndClass) => {
  const styles = useTextStyles(textStyle);
  const animate = useAnimation();
  const frame = useCurrentFrame();
  let animatedText = text;

  const variables = useMemo(() => {
    return extractVariables(text);
  }, [text]);

  for (const v of variables) {
    const numberAnimations = animations?.filter(
      (a) => a.prop === "number" && a.variable === v
    );
    const textAnimations = animations?.filter(
      (a) => a.prop === "text" && a.variable === v
    );
    let value: string | undefined = undefined;
    if (numberAnimations?.length) {
      value = Math.round(
        numberAnimations.reduce((a, b) => a + animate(b), 0)
      ).toFixed(0);
    } else if (textAnimations?.length && "value" in textAnimations[0]) {
      const text = textAnimations[0].value;
      value = text?.slice(
        0,
        Math.round(
          text.length * textAnimations.reduce((a, b) => a + animate(b), 0)
        )
      );
    }
    if (value !== undefined)
      animatedText = animatedText.replace(`{{${v}}}`, value);
  }

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
        {animatedText}
      </p>
    </div>
  );
};
