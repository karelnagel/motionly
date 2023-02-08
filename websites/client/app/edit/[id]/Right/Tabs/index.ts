import { ComponentProps } from "@motionly/base";
import { IconType } from "react-icons/lib";
import { UserInput } from "../../../../../components/inputs/Inputs";
import { animations } from "./animations";
import { filters } from "./filters";
import { general } from "./general";
import { map } from "./map";
import { transform } from "./transform";

export type Tab = {
  name: string;
  Icon: IconType;
  if?: (comp: ComponentProps) => boolean;
  inputs?: UserInput[];
};

export const RightTabs: { [key: string]: Tab } = {
  general,
  transform,
  animations,
  map,
  filters,
};
export const getRightTabs = (comp: ComponentProps) => {
  return Object.fromEntries(Object.entries(RightTabs).filter(([_, tab]) =>
    tab.if ? tab.if(comp) : true
  ))
};

export type RightTabs = keyof typeof RightTabs;
