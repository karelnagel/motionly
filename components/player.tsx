import { ReactElement } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Player = ({
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
    <div className="overflow-hidden col-span-4 bg-gray-200 flex items-center justify-center relative">
      <div className="absolute top-4 right-4 flex items-center bg-white z-20 px-3 py-2 rounded-lg">
        <AiOutlineMinus onClick={() => setScale(scale - 0.05)} className="cursor-pointer" />
        <input
          value={scale || 0}
          className="w-16 text-center"
          onChange={(e) => setScale(Number(e.target.value) || 0)}
        />
        <AiOutlinePlus onClick={() => setScale(scale + 0.05)} className="cursor-pointer" />
      </div>
      <div style={{ width: `${width * scale}px`, height: `${height * scale}px` }}>
        <div
          className=" border border-black overflow-hidden shrink-0 bg-white"
          style={{
            transform: `scale(${scale}) `,
            transformOrigin: "top left",
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
