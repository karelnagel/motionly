import { QRCodeCompProps } from "@asius/types";
import QRCode from "react-qr-code";

export const QRCodeComp = ({
  text,
  color,
  background: backgroundColor,
  height,
  width,
}: QRCodeCompProps) => {
  return (
    <QRCode value={text} size={Math.min(height, width)} fgColor={color} bgColor={backgroundColor} />
  );
};
