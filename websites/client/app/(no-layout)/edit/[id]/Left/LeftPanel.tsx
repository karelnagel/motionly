import { lazy, Suspense } from "react";
import { LeftTabs } from "./Tabs";
import { useProject } from "../../../../../hooks/useProject";
import { PanelDiv } from "../../../../../components/PanelDiv";

export const LeftPanel = () => {
  const tab = useProject((t) => t.leftTab);
  if (!tab) return null;
  const Component = lazy(LeftTabs[tab].Component);
  return (
    <PanelDiv
      reverse
      widthSelector={(s) => s.leftWidth}
      setWidthSelector={(s) => s.leftSetWidth}
    >
      <Suspense>
        <Component />
      </Suspense>
    </PanelDiv>
  );
};
