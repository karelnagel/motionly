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

  const find = (
    comps: ComponentProps[] = template.comps,
    id: string = selected
  ): ComponentProps | null => {
    let sel = comps.find((comp) => comp.id === id) || null;
    if (sel) return sel;
    for (const comp of comps) {
      if (comp.comp === "div" || comp.comp === "mockup")
        sel = find(comp.children, id);
      if (sel) break;
    }
    return sel;
  };
  const selectedComp = find();

  const deleteComp = (
    id: string = selected,
    comps: ComponentProps[] = template.comps,
    setComps: (c: ComponentProps[]) => void = (comps) =>
      setTemplate({ ...template, comps })
  ) => {
    if (comps.find((c) => c.id === id)) {
      setComps(comps.filter((c) => c.id !== id));
    } else {
      comps.forEach((comp) => {
        if (comp.comp === "div" || comp.comp === "mockup")
          deleteComp(id, comp.children, (children) =>
            setComps(
              comps.map((c) => (c.id === comp.id ? { ...comp, children } : c))
            )
          );
      });
    }
  };

  const addComp = (comp: ComponentProps | null = selectedComp) => {
    const id = getRandomId();
    if (!comp) return;
    setTemplate({
      ...template,
      comps: [...template.comps, { ...comp, id }],
    });
    setSelected(id);
  };

  const changeParent = (
    parentId: string,
    comp: ComponentProps | null = selectedComp
  ) => {
    deleteComp();
    if (!comp) return;
    if (!parentId) {
      setTemplate({
        ...template,
        comps: [...template.comps, { ...comp, id: getRandomId() }],
      });
    } else {
      const parent = find(undefined, parentId);
      console.log(parent, parentId);
      console.log(comp);
      if (!parent) return;
      if (parent.comp === "div" || parent.comp === "mockup")
        parent.children = [...parent.children, { ...comp, id: getRandomId() }];
    }
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
    selected,
    setSelected: (id: string) => setSelected(id === selected ? "" : id),
    saveTime,
  };
};
