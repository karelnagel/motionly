import { useLeft } from "../../../../hooks/useLeft";
import { lazy, ReactNode, Suspense } from "react";
import { Resize } from "../../../../components/Resize";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
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
  const [sideWidth, setSideWidth] = useLocalStorage("left", 300);
  return (
    <div className="h-full ">
      <div
        style={{
          width: show ? sideWidth : 0,
        }}
        className="h-full bg-base-300 relative"
      >
        <div className=" h-full w-full p-2 flex flex-col">{children}</div>
        <Resize value={sideWidth} setValue={setSideWidth} reverse />
      </div>
    </div>
  );
};
