import { Comp } from "@motionly/components";
import { IoIosInformation } from "react-icons/io";
import { z } from "zod";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { useComponent, useRightStore, useTemplateStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

export type Right = Tab & {
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
  const rightTab = useRightStore((t) => t.rightTab);
  const rightWidth = useRightStore((t) => t.rightWidth);
  const setRightWidth = useRightStore((t) => t.setRightWidth);
  const right = useRight();
  return <Panel width={rightWidth} setWidth={setRightWidth} items={right} tab={rightTab} />;
};

export const RightTabs = () => {
  const setRightTab = useRightStore((t) => t.setRightTab);
  const rightTab = useRightStore((t) => t.rightTab);
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
