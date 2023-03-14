import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

export const Popup = ({
  hide,
  children,
  className,
}: {
  hide: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      onClick={() => hide()}
      className="fixed top-0 left-0 h-full w-full flex flex-col items-center py-4 bg-black bg-opacity-40 z-[30000] overflow-y-auto"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-base-300 rounded-lg p-4 md:p-10 relative"
      >
        <IoIosClose
          onClick={hide}
          className="absolute top-3 right-3 text-4xl cursor-pointer"
        />
        <div className={`flex flex-col items-center space-y-3 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
