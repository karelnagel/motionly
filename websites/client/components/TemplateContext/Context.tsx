/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentProps } from "@motionly/base";
import { createContext } from "react";
import { Tabs, Template } from "../../types";

export const Context = createContext({
  template: {} as Template,
  setTemplate: (template: Template) => {},
  setComp: (element: Partial<ComponentProps>) => {},
  addComp: (comp?: ComponentProps) => {},
  deleteComp: () => {},
  selected: "",
  setSelected: (id: string) => {},
  saveTime: undefined as Date | undefined,
  undo: undefined as (() => void) | undefined,
  redo: undefined as (() => void) | undefined,

  setComps: (comps: ComponentProps[], parentId: string) => {},

  changeParent: (newParentd: string) => {},

  selectedComp: null as ComponentProps | null,

  tab: "props" as Tabs,
  setTab: (tab: Tabs) => {},
});
