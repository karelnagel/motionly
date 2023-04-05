import { useEffect } from "react";
import { IoIosInformation } from "react-icons/io";
import { z } from "zod";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { definedWrappers, WrapperName } from "../../../composition/wrappers";
import { useComponent, useRightStore, useTemplateStore } from "../../../store";
import { component } from "./Component";
import { general } from "./General";

const WrapperWrapper = ({ id }: { id: WrapperName }) => {
  const value = useComponent((c) => c.wrappers[id]);
  const editComponentWrapper = useTemplateStore((state) => state.editComponentWrapper);
  const Wrapper = definedWrappers[id].edit as any;
  useEffect(() => {
    if (!value) editComponentWrapper(definedWrappers[id].default);
  }, []);
  if (!value || value.type !== id) return null;
  return <Wrapper value={value} onChange={(v: typeof value) => editComponentWrapper({ ...value, ...v })} />;
};

export const RightTab = z.enum(["general", "component"]).or(WrapperName);
export type RightTab = z.infer<typeof RightTab>;

export type Right = Tab;

export const right: { [key: string]: Tab } = {
  general,
  component,
};

for (const id of WrapperName.options) {
  right[id] = {
    icon: definedWrappers[id].icon,
    title: definedWrappers[id].title,
    component: () => <WrapperWrapper id={id} />,
  };
}

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
