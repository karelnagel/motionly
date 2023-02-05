import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export const SidePanelDiv = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const [sideWidth, setSideWidth] = useLocalStorage("side", 200);
  return (
    <div className="h-full ">
      <div
        style={{
          width: show ? sideWidth : 0,
        }}
        className="h-full bg-base-300 relative"
      >
        <div className="absolute top-0 left-0 flex h-full p-3 w-full">
          {children}
        </div>
        <Resize value={sideWidth} setValue={setSideWidth} />
      </div>
    </div>
  );
};
