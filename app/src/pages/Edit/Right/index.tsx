import { IconType } from "react-icons";
import { IoIosInformation } from "react-icons/io";
import { z } from "zod";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { useRightStore, useTemplateStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

export type Right = Tab & {
  icon: IconType;
};

export const right = {
  general,
  component,
};

export const RightTab = z.enum(["general", "component"]);
export type RightTab = z.infer<typeof RightTab>;

export const RightPanel = () => {
  const rightTab = useRightStore((t) => t.tab);
  const rightWidth = useRightStore((t) => t.width);
  const setRightWidth = useRightStore((t) => t.setWidth);
  return <Panel width={rightWidth} setWidth={setRightWidth} items={right} tab={rightTab} />;
};

export const RightTabs = () => {
  const setRightTab = useRightStore((t) => t.setTab);
  const rightTab = useRightStore((t) => t.tab);
  const comp = useTemplateStore((s) => s.component);
  const items = comp ? right : {};
  return (
    <Tabs
      Button={() => (
        <button className="text-3xl">
          <IoIosInformation />
        </button>
      )}
      order={Object.keys(items) as RightTab[]}
      items={items}
      onClick={(v) => setRightTab(v)}
      selected={rightTab}
    />
  );
};
