import { Comp } from "../../../composition";
import { IconType } from "react-icons";
import { IoIosInformation } from "react-icons/io";
import { z } from "zod";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { useComponent, useRightStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

export type Right = Tab & {
  icon: IconType;
  show: (c?: Comp) => boolean;
};

export const right = {
  general,
  component,
};

export const RightTab = z.enum(["general", "component"]);
export type RightTab = z.infer<typeof RightTab>;

const useRight = () => {
  const comp = useComponent();
  return Object.fromEntries(Object.entries(right).filter(([_, value]) => value.show(comp)));
};

export const RightPanel = () => {
  const rightTab = useRightStore((t) => t.tab);
  const rightWidth = useRightStore((t) => t.width);
  const setRightWidth = useRightStore((t) => t.setWidth);
  const right = useRight();
  return <Panel width={rightWidth} setWidth={setRightWidth} items={right} tab={rightTab} />;
};

export const RightTabs = () => {
  const setRightTab = useRightStore((t) => t.setTab);
  const rightTab = useRightStore((t) => t.tab);
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
