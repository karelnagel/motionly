import { Comp } from "@motionly/composition";
import { IoIosInformation } from "react-icons/io";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { useComponent, useStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

export type Right = Tab & {
  show: (c?: Comp) => boolean;
};

export const right = {
  general,
  component,
};

export type RightTab = keyof typeof right;

const useRight = () => {
  const comp = useComponent();
  return Object.fromEntries(Object.entries(right).filter(([_, value]) => value.show(comp)));
};

export const RightPanel = () => {
  const rightTab = useStore((t) => t.rightTab);
  const rightWidth = useStore((t) => t.rightWidth);
  const setRightWidth = useStore((t) => t.setRightWidth);
  const right = useRight();
  return <Panel width={rightWidth} setWidth={setRightWidth} items={right} tab={rightTab} />;
};

export const RightTabs = () => {
  const setRightTab = useStore((t) => t.setRightTab);
  const rightTab = useStore((t) => t.rightTab);
  const right = useRight();
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
