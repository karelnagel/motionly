import ReactQRCode from "react-qr-code";
import { z } from "zod";
import { Color } from "@motionly/inputs";
import { Component } from "..";
import { IoQrCodeOutline } from "react-icons/io5";

export const QRCodeProps = z.object({
  text: z.string().optional(),
  color: Color.optional(),
  bg: Color.optional(),
});
export type QRCodeProps = z.infer<typeof QRCodeProps>;

export const qrcode: Component<QRCodeProps> = {
  zod: QRCodeProps,
  Icon: IoQrCodeOutline,
  hue: 360,
  inputs: {
    bg: { color: { label: "Background" } },
    color: { color: { label: "Color" } },
    text: { text: { label: "Text" } },
  },
  examples: [
    {
      title: "QR Code",
      props: { props: { text: "https://motionly.video" } },
    },
  ],
  component: ({ text = "", color, bg }) => {
    return <ReactQRCode style={{ width: "100%", height: "100%" }} value={text} fgColor={color} bgColor={bg} />;
  },
};
