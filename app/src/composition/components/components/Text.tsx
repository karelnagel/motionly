import { TextStyle } from "../../../inputs";
import { z } from "zod";
import { Component } from "..";
import { useTextStyles } from "../../helpers/useTextStyles";
import { IoText } from "react-icons/io5";

export const JustifyContent = z.enum(["start", "center", "end"]);
export type JustifyContent = z.infer<typeof JustifyContent>;

export const TextProps = z.object({
  textStyle: TextStyle.optional(),
  text: z.string().optional(),
  justifyContent: JustifyContent.optional(),
});
export type TextProps = z.infer<typeof TextProps>;

export const text: Component<TextProps> = {
  zod: TextProps,
  Icon: IoText,
  hue: 89,
  examples: [
    {
      props: {
        props: {
          text: "Regular",
          textStyle: {
            fontFamily: "Roboto",
            fontSize: 130,
            textAlign: "center",
            color: "#000000ff",
          },
        },
      },
      title: "Regular",
    },
    {
      props: {
        props: {
          text: "Title",
          textStyle: {
            fontFamily: "Roboto",
            fontSize: 200,
            fontWeight: "800",
            textAlign: "center",
            color: "#000000ff",
          },
        },
      },
      title: "Title",
    },
  ],
  inputs: {
    text: { text: { label: "Text" } },
    textStyle: { text_style: { label: "Text Style" } },
    justifyContent: { select: { label: "Justify Content", zod: JustifyContent } },
  },
  component: ({ text, textStyle, justifyContent }) => {
    const styles = useTextStyles(textStyle || {});
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
          style={{
            ...styles,
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </p>
      </div>
    );
  },
};
