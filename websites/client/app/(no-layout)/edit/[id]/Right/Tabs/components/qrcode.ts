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
      label: "Text",
      type: "text",
    },
    {
      prop: "color",
      label: "Color",
      type: "color",
    },
    {
      prop: "bg",
      label: "Background",
      type: "color",
    },
  ],
};
