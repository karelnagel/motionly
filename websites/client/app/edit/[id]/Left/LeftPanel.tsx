import { useLeft } from "../../../../hooks/useProject/leftSlice";
import { lazy, ReactNode, Suspense } from "react";
import { Resize } from "../../../../components/Resize";
import { LeftTabs } from "./Tabs";

export const LeftPanel = () => {
  const tab = useLeft((t) => t.tab);
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
  const width = useLeft((t) => t.width);
  const setWidth = useLeft((t) => t.setWidth);
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
