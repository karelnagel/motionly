import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useProject } from "../../../../hooks/useProject";

export const RightDiv = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const width = useProject((t) => t.rightWidth);
  const setWidth = useProject((t) => t.rightSetWidth);
  return (
    <div className="h-full ">
      <div
        style={{
          width: show ? width : 0,
        }}
        className="h-full bg-base-300 relative"
      >
        <div className="absolute top-0 left-0 flex p-3 w-full flex-col h-full">
          {children}
        </div>
        <Resize value={width} setValue={setWidth} />
      </div>
    </div>
  );
};
