"use client";
import { ReactElement } from "react";
import { Scale } from "../../../components/Scale";

export const Middle = ({
  height,
  width,
  children,
  scale,
  setScale,
}: {
  children: ReactElement;
  height: number;
  width: number;
  scale: number;
  setScale: (scale: number) => void;
}) => {
  return (
    <div className="overflow-hidden col-span-4 bg-base-content flex items-center justify-center relative">
      <div style={{ width: `${width * scale}px`, height: `${height * scale}px` }}>
        <Scale scale={scale} setScale={setScale} />
        <div className="border border-black overflow-hidden shrink-0 bg-white select-none">
          {children}
        </div>
      </div>
    </div>
  );
};
