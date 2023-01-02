import { QRCodeProps } from "@asius/types";
import ReactQRCode from "react-qr-code";

export const QRCode = ({
  text,
  color,
  background: backgroundColor,
  height,
  width,
}: QRCodeProps) => {
  return (
    <ReactQRCode
      value={text}
      size={Math.min(height, width)}
      fgColor={color}
      bgColor={backgroundColor}
    />
  );
};
