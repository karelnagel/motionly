import { QRCodeProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const qrcode: Tab<QRCodeProps> = {
  name: "QR Code",
  Icon: IoIosSettings,
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
