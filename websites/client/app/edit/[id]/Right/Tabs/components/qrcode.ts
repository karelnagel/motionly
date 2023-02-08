import { QRCodeProps } from "@motionly/base";
import { Component } from ".";
import { IoQrCodeOutline } from "react-icons/io5";

export const qrcode: Component<QRCodeProps> = {
  name: "QR Code",
  Icon: IoQrCodeOutline,
  hue: 360,
  inputs: [
    {
      prop: "text",
      type: "text",
    },
    {
      prop: "color",
      type: "color",
    },
    {
      prop: "bg",
      type: "color",
    },
  ],
};
