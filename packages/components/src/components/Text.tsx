import { TextProps } from "@asius/types";
import { getTextStyle } from "../helpers";

export const Text = ({ textStyle, text }: TextProps) => {
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
