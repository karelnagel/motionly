import { updateTemplate } from "@asius/sdk";
import { ComponentProps, TemplateType } from "@asius/components";
import { useEffect, useState } from "react";
import { getRandomId } from "../helpers";

export const useTemplate = (startTemplate: TemplateType) => {
  const [history, setHistory] = useState<TemplateType[]>([]);
  const [current, setCurrent] = useState(-1);
  const [selected, setSelected] = useState("template");
  const [saveTime, setSaveTime] = useState<Date>();
  const [wasUndoOrRedo, setWasUndoOrRedo] = useState(false);
  // eslint-disable-next-line prefer-const
  let [template, setTemplate] = useState(startTemplate);
  if (!template.isOwner)
    setTemplate = () => alert("You have to clone this template to edit!");

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

  const setComp = (element: Partial<ComponentProps>) => {
    const get = (comps: ComponentProps[]) => {
      return comps.map((comp) => {
        if (comp.id === selected) {
          comp = { ...comp, ...element } as ComponentProps;
        }
        if (comp.comp === "div" || comp.comp === "mockup") {
          comp.children = get(comp.children);
        }
        return comp;
      });
    };
    const newComps = get(template.comps);
    setTemplate({ ...template, comps: newComps });
  };
  const setComps = (
    comps: ComponentProps[],
    parentId: string,
    currentComps: ComponentProps[] = template.comps,
    currentParentId = ""
  ) => {
    let newComps = currentComps;
    if (currentParentId === parentId) {
      newComps = comps;
    } else {
      newComps = newComps.map((comp) => {
        if (comp.comp === "div" || comp.comp === "mockup") {
          comp.children = setComps(comps, parentId, comp.children, comp.id);
        }
        return comp;
      });
    }

    if (!currentParentId) setTemplate((t) => ({ ...t, comps: newComps }));
    return newComps;
  };

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

  const deleteComp = (
    id: string = selected,
    comps: ComponentProps[] = template.comps,
    isBase = true
  ) => {
    const newComps = comps.filter((c) => c.id !== id);
    for (const comp of newComps) {
      if (comp.comp === "div" || comp.comp === "mockup") {
        const children = deleteComp(id, comp.children, false);
        comp.children = children;
      }
    }
    if (isBase) setTemplate((t) => ({ ...t, comps: newComps }));
    setSelected("");
    return newComps;
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
    parentId = selectedParentId,
    currentParentId = "",
    currentComps = template.comps
  ) => {
    const newComps = currentComps;

    if (parentId === currentParentId && comp) {
      const newComp = setRandomIds(comp);
      newComps.push(newComp);
      setSelected(newComp.id);
    } else {
      for (const c of newComps) {
        if (c.comp === "div" || c.comp === "mockup") {
          c.children = addComp(comp, parentId, c.id, c.children);
        }
      }
    }
    if (!currentParentId) {
      setTemplate((t) => ({ ...t, comps: newComps }));
    }
    return newComps;
  };

  const changeParent = (
    newParentId: string,
    parentId = "",
    comps: ComponentProps[] = template.comps
  ) => {
    let newComps = comps;
    if (!selectedComp) return newComps;

    newComps = newComps.filter((c) => c.id !== selectedComp.id);
    if (newParentId === parentId && selectedComp) {
      newComps.push(selectedComp);
    }
    for (const comp of newComps) {
      if (comp.comp === "div" || comp.comp === "mockup") {
        const children = changeParent(newParentId, comp.id, comp.children);
        newComps = newComps.map((c) =>
          c.id === comp.id ? { ...comp, children } : c
        );
      }
    }
    if (!parentId) setTemplate({ ...template, comps: newComps });
    return newComps;
  };

  return {
    template,
    setComp,
    selectedComp,
    setTemplate,
    deleteComp,
    addComp,
    undo,
    redo,
    changeParent,
    setComps,
    selected,
    setSelected: (id: string) => setSelected(id === selected ? "" : id),
    saveTime,
  };
};
