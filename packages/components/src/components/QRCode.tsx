import ReactQRCode from "react-qr-code";
import { StyleAndClass } from "@asius/base";
import { QRCodeProps } from "@asius/base";

export const defaultQRCodeProps: QRCodeProps = {
  comp: "qrcode",
  text: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
};

export const QRCode = ({
  text,
  color,
  bg: backgroundColor,
  style,
  className,
}: QRCodeProps & StyleAndClass) => {
  return (
    <ReactQRCode
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      value={text}
      fgColor={color}
      bgColor={backgroundColor}
    />
  );
};
