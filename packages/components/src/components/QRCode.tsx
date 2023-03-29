import ReactQRCode from "react-qr-code";
import { z } from "zod";
import { Color } from "@motionly/inputs";
import { Component } from "..";

export const QRCodeProps = z.object({
  text: z.string(),
  color: Color.optional(),
  bg: Color.optional(),
});
export type QRCodeProps = z.infer<typeof QRCodeProps>;

export const qrcode: Component<QRCodeProps> = {
  zod: QRCodeProps,
  inputs: {
    bg: { color: { label: "Background" } },
    color: { color: { label: "Color" } },
    text: { text: { label: "Text" } },
  },
  component: ({ text, color, bg }) => {
    return <ReactQRCode style={{ width: "100%", height: "100%" }} value={text} fgColor={color} bgColor={bg} />;
  },
};
