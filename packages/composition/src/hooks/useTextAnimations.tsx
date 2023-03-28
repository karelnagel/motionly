import { AnimationProps } from "@motionly/base";
import { useMemo } from "react";
import { useAnimation } from "./useAnimations";

function extractVariables(text: string): string[] {
  const regex = /{{([^}]+)}}/g;
  let match;
  const variables: string[] = [];
  while ((match = regex.exec(text))) {
    variables.push(match[1]);
  }
  return variables;
}

export const useTextAnimations = (
  animations: AnimationProps[],
  text: string
) => {
  const animate = useAnimation();
  
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
  return animatedText;
};
