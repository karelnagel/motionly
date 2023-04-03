import { IoIosArrowBack } from "react-icons/io";
import { z } from "zod";
import { Panel } from "../../../components/Panel";
import { Tab, Tabs } from "../../../components/Tabs";
import { useLeftStore, useTemplateStore } from "../../../store";
import { add } from "./Add";
import { code } from "./Code";
import { template } from "./Template";

export type Left = Tab;

export const left = {
  template,
  add,
  code,
};
export const LeftTab = z.enum(["add", "code", "template"]);
export type LeftTab = z.infer<typeof LeftTab>;

export const LeftPanel = () => {
  const leftTab = useLeftStore((t) => t.tab);
  const leftWidth = useLeftStore((t) => t.width);
  const setLeftWidth = useLeftStore((t) => t.setWidth);
  return <Panel width={leftWidth} setWidth={setLeftWidth} items={left} tab={leftTab} reverse />;
};

export const LeftTabs = () => {
  const setLeftTab = useLeftStore((t) => t.setTab);
  const leftTab = useLeftStore((t) => t.tab);
  const setPage = useTemplateStore((t) => t.setPage);
  return (
    <Tabs
      Button={() => (
        <button onClick={() => setPage("home")} className="text-xl">
          <IoIosArrowBack />
        </button>
      )}
      order={Object.keys(left) as LeftTab[]}
      items={left}
      onClick={(v) => setLeftTab(v)}
      selected={leftTab}
    />
  );
};
