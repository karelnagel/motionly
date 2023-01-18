import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

export const Popup = ({
  hide,
  children,
  className = "flex flex-col items-center space-y-3",
}: {
  hide: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      onClick={() => hide()}
      className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-40 z-[3000]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-base-300 rounded-lg p-10 relative"
      >
        <IoIosClose
          onClick={hide}
          className="absolute top-3 right-3 text-4xl cursor-pointer"
        />
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};
