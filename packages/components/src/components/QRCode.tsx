import ReactQRCode from "react-qr-code";
import { StyleAndClass } from "@motionly/base";
import { QRCodeProps } from "@motionly/base";
import { useColors } from "../useColors";

export const defaultQRCodeProps: QRCodeProps = {
  comp: "qrcode",
  text: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
};

export const QRCode = ({
  text,
  color,
  bg,
  style,
  className,
}: QRCodeProps & StyleAndClass) => {
  const getColor = useColors();
  return (
    <ReactQRCode
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      value={text}
      fgColor={getColor(color)}
      bgColor={getColor(bg)}
    />
  );
};
