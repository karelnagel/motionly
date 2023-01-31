import ReactQRCode from "react-qr-code";
import { StyleAndClass } from "@motionly/base";
import { QRCodeProps } from "@motionly/base";
import { useColor } from "../useColor";

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
  const fgColor = useColor(color);
  const bgColor = useColor(bg);
  return (
    <ReactQRCode
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      value={text}
      fgColor={fgColor}
      bgColor={bgColor}
    />
  );
};
