import ReactQRCode from "react-qr-code";

export type QRCodeProps = {
  type: "qrcode";
  text: string;
  color?: string;
  background?: string;
  size?: number;
};

export const defaultQRCodeProps: QRCodeProps = {
  type: "qrcode",
  text: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
};

export const QRCode = ({
  text,
  color,
  background: backgroundColor,
  size,
}: QRCodeProps) => {
  return (
    <ReactQRCode
      value={text}
      size={size}
      fgColor={color}
      bgColor={backgroundColor}
    />
  );
};
