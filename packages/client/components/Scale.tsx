import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Scale = ({
  scale,
  setScale,
}: {
  scale: number;
  setScale: (scale: number) => void;
}) => {
  return (
    <div className="absolute top-4 right-4 flex items-center bg-base-300 z-20 px-3 py-2 rounded-lg space-x-2">
      <AiOutlineMinus
        onClick={() => setScale(scale - 0.05)}
        className="cursor-pointer hover:scale-110"
      />
      <input
        value={scale || 0}
        className="w-10 text-center bg-base-300 hover:scale-105"
        onChange={(e) => setScale(Number(e.target.value) || 0)}
      />
      <AiOutlinePlus
        onClick={() => setScale(scale + 0.05)}
        className="cursor-pointer hover:scale-110"
      />
    </div>
  );
};
