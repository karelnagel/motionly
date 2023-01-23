import { StyleAndClass } from "@asius/base";
import { TextProps } from "@asius/base";
import { useTextStyles } from "../useTextStyles";

export const defaultTextProps: TextProps = {
  comp: "text",
  textStyle: {
    bg: "#00000000",
    color: "#000000FF",
    fontSize: 120,
    fontFamily: "Inter",
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
  const getStyle = useTextStyles();
  return (
    <p
      className={className}
      style={{
        ...getStyle(textStyle),
        height: "100%",
        width: "100%",
        ...style,
      }}
    >
      {text}
    </p>
  );
};
