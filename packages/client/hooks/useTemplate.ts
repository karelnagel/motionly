import { updateTemplate } from "@asius/sdk";
import { CompProps, TemplateType } from "@asius/types";
import { useCallback, useState } from "react";

export const useTemplate = (starTemplate: TemplateType) => {
  const [template, setTemplate] = useState<TemplateType>(starTemplate);
  const [selected, setSelected] = useState("");

  const setComp = (element: CompProps) => {
    const get = (comps: CompProps[]) => {
      return comps.map((comp) => {
        if (comp.id === element.id) {
          comp = element;
        }
        if (comp.type === "div" && comp.children) {
          comp.children = get(comp.children);
        }
        return comp;
      });
    };
    const newComps = get(template.comps);
    setTemplate((t) => ({ ...t, comps: newComps }));
  };

  const find = (comps: CompProps[]): CompProps | null => {
    let selectedComp = comps.find((comp) => comp.id === selected) || null;
    if (selectedComp) return selectedComp;
    comps.forEach((comp) =>
      comp.type === "div" ? (selectedComp = find(comp.children)) : null
    );
    return selectedComp;
  };
  const selectedComp = find(template.comps);

  const update = useCallback(async () => {
    const updatedTemplate = await updateTemplate({
      id: template.id || "",
      template,
    });
    if (updatedTemplate) setTemplate(updatedTemplate);
  }, [template]);

  const deleteComp = (id: string) => {
    setTemplate((t) => ({ ...t, comps: t.comps.filter((c) => c.id !== id) }));
    setSelected("");
  };
  const addComp = (comp: CompProps) => {
    const id = Math.random().toString(36).substring(6);
    setTemplate((t) => ({
      ...t,
      comps: [...t.comps, { ...comp, id }],
    }));
    setSelected(id);
  };

  return {
    template,
    setComp,
    update,
    selectedComp,
    setTemplate,
    deleteComp,
    addComp,
    selected,
    setSelected,
  };
};
