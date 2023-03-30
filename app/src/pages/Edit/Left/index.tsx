import { Panel } from "../../../components/Panel";
import { Tabs } from "../../../components/Tabs";
import { useStore } from "../../../store";
import { add } from "./Add";
import { code } from "./Code";
import { general } from "./General";

export type Left = {
  icon: () => JSX.Element;
  title: string;
  component: () => JSX.Element;
};

export const left = {
  add,
  code,
  general,
};

export type LeftTab = keyof typeof left;

export const LeftPanel = () => {
  const leftTab = useStore((t) => t.leftTab);
  const leftWidth = useStore((t) => t.leftWidth);
  const setLeftWidth = useStore((t) => t.setLeftWidth);
  return <Panel width={leftWidth} setWidth={setLeftWidth} items={left} tab={leftTab} reverse />;
};

export const LeftTabs = () => {
  const setLeftTab = useStore((t) => t.setLeftTab);
  const leftTab = useStore((t) => t.leftTab);
  return <Tabs order={Object.keys(left) as LeftTab[]} items={left} onClick={(v) => setLeftTab(v)} selected={leftTab} />;
};
