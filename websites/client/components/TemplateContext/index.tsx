import { applyInputs, ComponentProps } from "@motionly/base";
import { ReactNode, useRef, useState } from "react";
import { getRandomId } from "../../helpers";
import { Context } from "./Context";
import { Tabs, Template } from "../../types";
import { updateTemplate } from "../../sdk/templates/update";

export const TemplateContext = ({
  startTemplate,
  children,
}: {
  startTemplate: Template;
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<Template[]>([
    JSON.parse(JSON.stringify(startTemplate)),
  ]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelectedState] = useState("template");
  const [template, setTemplateState] = useState(startTemplate);
  const [saveTime, setSaveTime] = useState<Date>();
  const [tab, setTab] = useState<Tabs>("props");
  const historyTimeout = useRef<NodeJS.Timeout>();
  const saveTimeout = useRef<NodeJS.Timeout>();

  const setSelected = (id: string) => {
    if (selected === id) return setSelectedState("");
    setSelectedState(id);
  };

  const setTemplate = (template: Template) => {
    setTemplateState(template);

    if (historyTimeout.current) clearTimeout(historyTimeout.current);
    historyTimeout.current = setTimeout(() => {
      setHistory([
        ...[...history].slice(0, current + 1),
        JSON.parse(JSON.stringify(template)),
      ]);
      setCurrent(current + 1);
    }, 600);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      const result = await updateTemplate({
        id: template.id || "",
        template,
      });
      if (!result) setSaveTime(undefined);
      setSaveTime(new Date());
    }, 3000);
  };
  const undo =
    current > 0
      ? () => {
          setTemplateState(history[current - 1]);
          setCurrent(current - 1);
        }
      : undefined;
  const redo =
    current < history.length - 1
      ? () => {
          setTemplateState(history[current + 1]);
          setCurrent(current + 1);
        }
      : undefined;
  const find = (
    comps: ComponentProps[] = template.comps || [],
    id: string = selected,
    parentId = ""
  ): [ComponentProps | null, string] => {
    let sel = comps.find((comp) => comp.id === id) || null;
    let newParentId = parentId;
    if (sel) return [sel, parentId];
    for (const comp of comps) {
      if ("comps" in comp) [sel, newParentId] = find(comp.comps, id, comp.id);
      if (sel) return [sel, newParentId];
    }
    return [sel, ""];
  };
  const [selectedComp, selectedParentId] = find();

  const updateTree = (
    fn: (comp: ComponentProps[], parentId: string) => ComponentProps[],
    currentComps: ComponentProps[] = template.comps || [],
    currentParentId = ""
  ) => {
    let newComps = currentComps;
    newComps = fn(newComps, currentParentId);
    for (const comp of newComps) {
      if ("comps" in comp) {
        const children = updateTree(fn, comp.comps, comp.id);
        comp.comps = children;
      }
    }
    if (!currentParentId) setTemplate({ ...template, comps: newComps });
    return newComps;
  };

  const setComp = (element: Partial<ComponentProps>) => {
    updateTree((comps) =>
      comps.map((comp) =>
        comp.id === selected
          ? ({ ...comp, ...element } as ComponentProps)
          : comp
      )
    );
  };

  const setComps = (newComps: ComponentProps[], parentId: string) => {
    updateTree((comps, parent) => {
      if (parent === parentId) return newComps;
      return comps;
    });
  };

  const deleteComp = (id: string = selected) => {
    updateTree((comps) => {
      return comps.filter((comp) => comp.id !== id);
    });
    setSelected(template.comps?.find((c) => c.id !== id)?.id || "");
  };

  const setRandomIds = (comp: ComponentProps) => {
    const newComp = { ...comp, id: getRandomId() };
    if ("comps" in newComp) {
      newComp.comps = newComp.comps?.map((c) => setRandomIds(c));
    }
    return newComp;
  };

  const addComp = (
    comp: ComponentProps | null = selectedComp,
    parentId = selectedParentId
  ) => {
    if (!comp) return;

    const newComp = setRandomIds(comp);
    updateTree((comps, parent) => {
      if (parent === parentId) {
        return [...comps, newComp];
      }
      return comps;
    });
    setSelected(newComp.id);
  };

  const changeParent = (newParentId: string) => {
    updateTree((comps, parentId) => {
      const newComps = comps.filter((c) => c.id !== selected);
      if (newParentId === parentId && selectedComp)
        if (selectedComp) newComps.push(selectedComp);
      return newComps;
    });
  };

  return (
    <Context.Provider
      value={{
        changeParent,
        addComp,
        deleteComp,
        redo,
        saveTime,
        selected,
        selectedComp,
        setComp,
        setComps,
        setSelected,
        setTemplate,
        template: applyInputs(template),
        undo,
        tab,
        setTab,
      }}
    >
      {children}
    </Context.Provider>
  );
};
