/* eslint-disable @next/next/no-img-element */
"use client";
import { hexToRGBA } from "../../helpers";
import { TextType } from "@imageapi/types";

export const Text = ({ element }: { element: TextType; }) => {
  return (
    <p
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: hexToRGBA(element.backgroundColor),
        color: hexToRGBA(element.color),
        fontFamily: element.fontFamily,
        fontSize: `${element.fontSize}px`,
        lineHeight: `${element.fontSize}px`,
        padding: 0,
        margin: 0,
        fontWeight: element.fontWeight,
        borderRadius: `${element.borderRadius || 0}px`,
        textAlign: element.textAlign as any,
      }}
    >
      {element.text}
    </p>
  );
};
