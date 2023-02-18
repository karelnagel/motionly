import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export const Bar = ({
  children,
  bottom,
}: {
  children: ReactNode;
  bottom: ReactNode;
}) => {
  return (
    <div className="h-full w-[60px] shrink-0 flex flex-col justify-between items-center bg-base-100 border-x border-base-300">
      {children}
      <div className="border-t border-base-300 w-full flex justify-center items-center aspect-square">
        {bottom}
      </div>
    </div>
  );
};
export const BarItem = ({
  onClick,
  text,
  Icon,
  style,
  className,
}: {
  onClick: () => void;
  text: string;
  Icon: IconType;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`flex flex-col items-center cursor-pointer text-base-content-2 duration-150 space-y-1 py-1 hover:opacity-100 ${className}`}
    >
      <Icon className="h-6 w-6" />
      <p className="text-[11px] text-center">{text}</p>
    </div>
  );
};
