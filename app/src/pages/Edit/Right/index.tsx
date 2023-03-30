import { IconType } from "react-icons";
import { IoIosInformation } from "react-icons/io";
import { Panel } from "../../../components/Panel";
import { Tabs } from "../../../components/Tabs";
import { useStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

export type Right = {
  icon: IconType;
  title: string;
  component: () => JSX.Element;
};

export const right = {
  general,
  component,
};

export type RightTab = keyof typeof right;

export const RightPanel = () => {
  const rightTab = useStore((t) => t.rightTab);
  const rightWidth = useStore((t) => t.rightWidth);
  const setRightWidth = useStore((t) => t.setRightWidth);
  return <Panel width={rightWidth} setWidth={setRightWidth} items={right} tab={rightTab} />;
};

export const RightTabs = () => {
  const setRightTab = useStore((t) => t.setRightTab);
  const rightTab = useStore((t) => t.rightTab);
  return (
    <Tabs
      Button={() => (
        <button className="text-3xl">
          <IoIosInformation />
        </button>
      )}
      order={Object.keys(right) as RightTab[]}
      items={right}
      onClick={(v) => setRightTab(v)}
      selected={rightTab}
    />
  );
};
