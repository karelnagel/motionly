import { QRCodeProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const qrcode: Component<QRCodeProps> = {
  name: "QR Code",
  Icon: IoIosSettings,
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
