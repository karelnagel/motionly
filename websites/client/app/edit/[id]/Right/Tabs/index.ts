import { IconType } from "react-icons/lib";
import { UserInput } from "../../../../../components/inputs/Inputs";
import { animations } from "./animations";
import { components } from "./components";
// import { filters } from "./filters";
import { general } from "./general";
import { transform } from "./transform";

export type Tab<T> = {
  name: string;
  Icon: IconType;
} & (
  | {
      inputs: UserInput<T>[];
    }
  | {
      component: () => JSX.Element;
    }
);

export const RightTabs = {
  general,
  transform,
  animations,
  // filters,
  ...components,
};

export type RightTabs = keyof typeof RightTabs;
