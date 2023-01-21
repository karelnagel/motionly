import { getTextStyle } from "@asius/base";
import { StyleAndClass } from "@asius/base";
import { TextProps } from "@asius/base";

export const defaultTextProps: TextProps = {
  comp: "text",
  textStyle: {
    bg: "#00000000",
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
