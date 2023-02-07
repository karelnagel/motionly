import { lazy, ReactNode, Suspense } from "react";
import { Resize } from "../../../../components/Resize";
import { LeftTabs } from "./Tabs";
import { useProject } from "../../../../hooks/useProject";

export const LeftPanel = () => {
  const tab = useProject((t) => t.leftTab);
  if (!tab) return null;
  const Component = lazy(LeftTabs[tab].Component);
  return (
    <LeftDiv show={!!tab}>
      <Suspense>
        <Component />
      </Suspense>
    </LeftDiv>
  );
};

export const LeftDiv = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const width = useProject((t) => t.leftWidth);
  const setWidth = useProject((t) => t.leftSetWidth);
  return (
    <div className="h-full">
      <div
        style={{
          width: show ? width : 0,
        }}
        className="h-full bg-base-300 relative"
      >
        <div className="absolute top-0 left-0 h-full w-full p-2 flex flex-col">
          {children}
        </div>
        <Resize value={width} setValue={setWidth} reverse />
      </div>
    </div>
  );
};
