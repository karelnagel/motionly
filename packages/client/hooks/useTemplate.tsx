import { updateTemplate } from "@asius/sdk";
import { ComponentProps, TemplateType } from "@asius/components";
import { useEffect, useState } from "react";

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
        if (comp.comp === "div" && comp.children) {
          comp.children = get(comp.children);
        }
        return comp;
      });
    };
    const newComps = get(template.comps);
    setTemplate({ ...template, comps: newComps });
  };

  const find = (comps: ComponentProps[]): ComponentProps | null => {
    let selectedComp = comps.find((comp) => comp.id === selected) || null;
    if (selectedComp) return selectedComp;
    comps.forEach((comp) =>
      comp.comp === "div" ? (selectedComp = find(comp.children)) : null
    );
    return selectedComp;
  };
  const selectedComp = find(template.comps);

  const deleteComp = (id: string = selected) => {
    setTemplate({
      ...template,
      comps: template.comps.filter((c) => c.id !== id),
    });
    setSelected(template.comps.filter((c) => c.id !== id)?.[0]?.id || "");
  };
  const addComp = (comp: ComponentProps | null = selectedComp) => {
    const id = Math.random().toString(36).substring(6);
    if (!comp) return;
    setTemplate({
      ...template,
      comps: [...template.comps, { ...comp, id }],
    });
    setSelected(id);
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
    selected,
    setSelected: (id: string) => setSelected(id === selected ? "" : id),
    saveTime,
  };
};
