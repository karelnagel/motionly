import { ReactNode } from "react";
import { Resize } from "./Resize";
import { ProjectStore, useProject } from "../hooks/useProject";

export const PanelDiv = ({
  hide,
  children,
  reverse,
  widthSelector,
  setWidthSelector,
}: {
  hide?: boolean;
  children: ReactNode;
  reverse?: boolean;
  widthSelector: (state: ProjectStore) => number;
  setWidthSelector: (state: ProjectStore) => (v: number) => void;
}) => {
  const width = useProject(widthSelector);
  const setWidth = useProject(setWidthSelector);
  return (
    <div className="h-full ">
      <div
        style={{
          width: !hide ? width : 0,
        }}
        className="h-full bg-base-100 relative"
      >
        <div className="absolute top-0 left-0 flex p-3 w-full flex-col h-full overflow-auto">
          {children}
        </div>
        <Resize value={width} setValue={setWidth} reverse={reverse} />
      </div>
    </div>
  );
};
