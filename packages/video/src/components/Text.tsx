import { TextCompProps } from "@asius/types";
import { getTextStyle } from "../helpers";

export const TextComp = ({ textStyle, text }: TextCompProps) => {
  return (
    <p
      style={{
        ...getTextStyle(textStyle),
        height: "100%",
        width: "100%",
      }}
    >
      {text}
    </p>
  );
};
