import { updateTemplate } from "@asius/sdk";
import { ComponentProps, TemplateType } from "@asius/components";
import { ReactNode, useEffect, useState } from "react";
import { getRandomId } from "../../helpers";
import { Context } from "./Context";
import { Tabs } from "../../types";

export const TemplateContext = ({
  startTemplate,
  children,
}: {
  startTemplate: TemplateType;
  children: ReactNode;
}) => {
  const [history, setHistory] = useState<TemplateType[]>([]);
  const [current, setCurrent] = useState(-1);
  const [selected, setSelectedState] = useState("template");
  const [template, setTemplateState] = useState(startTemplate);
  const [saveTime, setSaveTime] = useState<Date>();
  const [wasUndoOrRedo, setWasUndoOrRedo] = useState(false);
  const [tab, setTab] = useState<Tabs>("props");

  const setSelected = (id: string) => {
    if (selected === id) return setSelectedState("");
    setSelectedState(id);
  };
  const setTemplate = (template: TemplateType) => {
    if (!template.isOwner) alert("You have to clone this template to edit!");
    else setTemplateState(template);
  };

  useEffect(() => {
    if (wasUndoOrRedo) return setWasUndoOrRedo(false);
    const timeout = setTimeout(() => {
      setHistory((h) => [...h.slice(0, current + 1), template]);
      setCurrent((c) => c + 1);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [template]);

  const undo =
    current > 0
      ? () => {
          setWasUndoOrRedo(true);
          setCurrent((c) => c - 1);
          setTemplate(history[current - 1]);
        }
      : undefined;
  const redo =
    current < history.length - 1
      ? () => {
          setWasUndoOrRedo(true);
          setCurrent((c) => c + 1);
          setTemplate(history[current + 1]);
        }
      : undefined;

  useEffect(() => {
    if (!template.isOwner) return;
    const timeout = setTimeout(async () => {
      const result = await updateTemplate({
        id: template.id || "",
        template,
      });
      if (!result) setSaveTime(undefined);
      setSaveTime(new Date());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [template]);

  const find = (
    comps: ComponentProps[] = template.comps,
    id: string = selected,
    parentId = ""
  ): [ComponentProps | null, string] => {
    let sel = comps.find((comp) => comp.id === id) || null;
    let newParentId = parentId;
    if (sel) return [sel, parentId];
    for (const comp of comps) {
      if (comp.comp === "div" || comp.comp === "mockup")
        [sel, newParentId] = find(comp.children, id, comp.id);
      if (sel) return [sel, newParentId];
    }
    return [sel, ""];
  };
  const [selectedComp, selectedParentId] = find();

  const updateTree = (
    fn: (comp: ComponentProps[], parentId: string) => ComponentProps[],
    currentComps: ComponentProps[] = template.comps,
    currentParentId = ""
  ) => {
    let newComps = currentComps;
    newComps = fn(newComps, currentParentId);
    for (const comp of newComps) {
      if (comp.comp === "div" || comp.comp === "mockup") {
        const children = updateTree(fn, comp.children, comp.id);
        comp.children = children;
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
  };

  const setRandomIds = (comp: ComponentProps) => {
    const newComp = { ...comp, id: getRandomId() };
    if (newComp.comp === "div" || newComp.comp === "mockup") {
      newComp.children = newComp.children.map((c) => setRandomIds(c));
    }
    return newComp;
  };

  const addComp = (
    comp: ComponentProps | null = selectedComp,
    parentId = selectedParentId
  ) => {
    if (!comp) return;
    updateTree((comps, parent) => {
      if (parent === parentId) {
        const newComp = setRandomIds(comp);
        return [...comps, newComp];
      }
      return comps;
    });
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
        template,
        undo,
        tab,
        setTab,
      }}
    >
      {children}
    </Context.Provider>
  );
};
